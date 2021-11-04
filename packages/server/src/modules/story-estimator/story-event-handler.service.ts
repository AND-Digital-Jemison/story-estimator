import { Injectable } from "@nestjs/common";
import { WebSocket } from "ws";
import { Game, GameRound, Round, Session, User } from "~/modules/story-estimator/classes/dto";
import { CompleteRoundEvent, JoinGameEvent, NewGameEvent, PointGameEvent } from "~/modules/story-estimator/classes/events";
import { StoryGameRepository } from "~/modules/story-estimator/story-game.repository";

@Injectable()
export class StoryEventHandlerService {

  constructor(private readonly storyGameRepository: StoryGameRepository) {
  }

  complete(event: CompleteRoundEvent) {
    const game = this.storyGameRepository.getGame(event.gameId);
    game.session.currentRound.point = event.point;
    game.session.currentRound.name = event.title;
    game.session.rounds.push(game.session.currentRound);
    game.session.currentRound = new GameRound(game.session.rounds.length + 1);
    game.session.users.forEach(user => {
      user.round = new Round();
    });
    game.updateClients();
  }

  create(client: WebSocket, event: NewGameEvent) {
    const session = new Session("1"); // todo auto generate id
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
    const user = game.session.users.find((u) => u.id === userId);
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
