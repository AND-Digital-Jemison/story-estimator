import { Injectable } from '@nestjs/common';
import { WebSocket } from 'ws';
import { Game } from './classes/dto/Game';
import { Round } from './classes/dto/Round';
import { UserRound } from './classes/dto/UserRound';
import { Session } from './classes/dto/Session';
import { User } from './classes/dto/User';
import { RoundVotesCount } from './classes/dto/RoundVotesCount';
import { CompleteRoundEvent } from './classes/events/complete-round-event';
import { JoinGameEvent } from './classes/events/join-game-event';
import { NewGameEvent } from './classes/events/new-game-event';
import { PointGameEvent } from './classes/events/point-game-event';
import { RevealEvent } from './classes/events/reveal-event';
import { StoryGameIdGeneratorService } from './story-game-id-generator.service';
import { StoryGameRepository } from './story-game.repository';
import { UpdateRoundVotesEvent } from './classes/events/update-round-votes-event';

@Injectable()
export class StoryEventHandlerService {
  constructor(
    private readonly storyGameRepository: StoryGameRepository,
    private readonly storyGameService: StoryGameIdGeneratorService
  ) {}

  complete(event: CompleteRoundEvent): void {
    const game = this.storyGameRepository.getGame(event.gameId);
    game.session.currentRound.selectedPoint = event.point;
    game.session.currentRound.name = event.title;
    game.session.rounds.push(game.session.currentRound);
    game.session.currentRound = new Round(game.session.rounds.length + 1);
    game.session.users.forEach((user: User) => {
      user.userRound = new UserRound();
    });
    game.session.currentRoundRevealed = false;
    game.session.currentRoundVotesCount.mostVoted = null;
    game.updateClients('complete');
  }

  create(client: WebSocket, event: NewGameEvent): void {
    const session = new Session(this.storyGameService.generate(), event.story); // todo auto generate id
    const user = new User(session.users.length + 1, event.name);
    session.users.push(user);
    const game = new Game(session, client);
    this.storyGameRepository.addGame(game);

    game.updateClients('create');
  }

  end(gameId: string): void {
    // TODO
    const game = this.storyGameRepository.getGame(gameId);
  }

  join(client: WebSocket, event: JoinGameEvent): void {
    const game = this.storyGameRepository.getGame(event.gameId);

    if (!game) {
      const notFoundMsg = {
        session: null,
        event: 'game-not-found',
      };
      client.send(JSON.stringify(notFoundMsg));

      return;
    }

    const user = new User(game.session.users.length + 1, event.name);
    game.session.users.push(user);
    game.clients.push(client);

    game.updateClients('join');
  }

  point(event: PointGameEvent): void {
    const game = this.storyGameRepository.getGame(event.gameId);
    const userId = event.userId;
    const user = game.session.users.find((u: User) => u.id === userId);
    if (!user) {
      throw new Error('User not found');
    }

    user.userRound = {
      selectedPoint: event.point,
      hasVoted: event.point === null ? false : true,
    };

    game.updateClients('point');
  }

  reveal(event: RevealEvent): void {
    const game = this.storyGameRepository.getGame(event.gameId);
    game.session.currentRoundRevealed = true;

    const roundUsers = game.session.users;
    const votesCount = new Map<string, number>();

    roundUsers.forEach(user => {
      const userVote = user.userRound.selectedPoint;

      votesCount[userVote] = votesCount[userVote]
        ? votesCount[userVote] + 1
        : 1;
    });

    // extract key of most voted point from count
    let max = 0;
    let mostVoted = '';

    for (const voteKey in votesCount) {
      if (votesCount[voteKey] >= max) {
        max = votesCount[voteKey];
        mostVoted = voteKey;
      }
    }

    const roundVotesCount: RoundVotesCount = {
      mostVoted: parseInt(mostVoted, 10),
      votesCount: votesCount,
    };

    game.session.currentRoundVotesCount = roundVotesCount;

    game.updateClients('reveal');
  }

  updateRoundVotes(event: UpdateRoundVotesEvent): void {
    const game = this.storyGameRepository.getGame(event.gameId);
    game.session.currentRoundVotesCount = event.currentRoundVotesCount;

    game.updateClients('updateRoundVotes');
  }
}
