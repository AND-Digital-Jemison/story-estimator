import { Injectable } from '@nestjs/common';
import { WebSocket } from 'ws';
import { Game } from './classes/dto/Game';
import { Round } from './classes/dto/Round';
import { UserRound } from './classes/dto/UserRound';
import { Session } from './classes/dto/Session';
import { User } from './classes/dto/User';
import { CompleteRoundEvent } from './classes/events/complete-round-event';
import { JoinGameEvent } from './classes/events/join-game-event';
import { NewGameEvent } from './classes/events/new-game-event';
import { PointGameEvent } from './classes/events/point-game-event';
import { StoryGameIdGeneratorService } from './story-game-id-generator.service';
import { StoryGameRepository } from './story-game.repository';

@Injectable()
export class StoryEventHandlerService {
  constructor(
    private readonly storyGameRepository: StoryGameRepository,
    private readonly storyGameService: StoryGameIdGeneratorService
  ) {}

  complete(event: CompleteRoundEvent) {
    const game = this.storyGameRepository.getGame(event.gameId);
    game.session.currentRound.selectedPoint = event.point;
    game.session.currentRound.name = event.title;
    game.session.rounds.push(game.session.currentRound);
    game.session.currentRound = new Round(game.session.rounds.length + 1);
    game.session.users.forEach((user: User) => {
      user.userRound = new UserRound();
    });
    game.updateClients();
  }

  create(client: WebSocket, event: NewGameEvent) {
    const session = new Session(this.storyGameService.generate(), event.story); // todo auto generate id
    const user = new User(session.users.length + 1, event.name);
    session.users.push(user);
    const game = new Game(session, client);
    this.storyGameRepository.addGame(game);

    game.updateClients();
  }

  end(gameId: string): void {
    // TODO
    const game = this.storyGameRepository.getGame(gameId);
  }

  join(client: WebSocket, event: JoinGameEvent) {
    const game = this.storyGameRepository.getGame(event.gameId);
    const user = new User(game.session.users.length + 1, event.name);
    game.session.users.push(user);
    game.clients.push(client);

    game.updateClients();
  }

  point(event: PointGameEvent) {
    const game = this.storyGameRepository.getGame(event.gameId);
    const userId = event.userId;
    const user = game.session.users.find((u: User) => u.id === userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.userRound = {
      selectedPoint: event.point,
      hasVoted: true,
    };
    game.updateClients();
  }
}
