import { Injectable } from "@nestjs/common";
import { WebSocket } from "ws";
import { Game } from "./classes/dto/Game";
import { GameRound } from "./classes/dto/GameRound";
import { Round } from "./classes/dto/Round";
import { Session } from "./classes/dto/Session";
import { User } from "./classes/dto/User";
import { CompleteRoundEvent } from "./classes/events/complete-round-event";
import { JoinGameEvent } from "./classes/events/join-game-event";
import { NewGameEvent } from "./classes/events/new-game-event";
import { PointGameEvent } from "./classes/events/point-game-event";
import { StoryGameIdGeneratorService } from "./story-game-id-generator.service";
import { StoryGameRepository } from "./story-game.repository";

@Injectable()
export class StoryEventHandlerService {

  constructor(private readonly storyGameRepository: StoryGameRepository,
              private readonly storyGameService: StoryGameIdGeneratorService) {
  }

  complete(event: CompleteRoundEvent) {
    const game = this.storyGameRepository.getGame(event.gameId);
    game.session.currentRound.point = event.point;
    game.session.currentRound.name = event.title;
    game.session.rounds.push(game.session.currentRound);
    game.session.currentRound = new GameRound(game.session.rounds.length + 1);
    game.session.users.forEach((user: User) => {
      user.round = new Round();
    });
    game.updateClients();
  }

  create(client: WebSocket, event: NewGameEvent) {
    const session = new Session(this.storyGameService.generate()); // todo auto generate id
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
    const user = new User(game.session.users.length + 1, event.userName);
    game.session.users.push(user);
    game.clients.push(client);

    game.updateClients();

  }

  point(event: PointGameEvent) {
    const game = this.storyGameRepository.getGame(event.gameId);
    const userId = event.userId;
    const user = game.session.users.find((u: User) => u.id === userId);
    if (!user) {
      throw new Error("User not found");
    }
    user.round = {
      point: event.point,
      voted: true
    };
    game.updateClients();
  }
}
