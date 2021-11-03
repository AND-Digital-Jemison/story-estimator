import { GameEvents, JoinGameEvent, NewGameEvent, Session, User, Game } from "@nest-react/domain";
import { Injectable } from "@nestjs/common";
import { StoryGameRepository } from "~/modules/story-estimator/story-game.repository";

@Injectable()
export class StoryEventHandlerService implements GameEvents {

  constructor(private readonly storyGameRepository: StoryGameRepository) {
  }

  complete(gameId: number, point: string): Session {
    // @ts-ignore
    return undefined;
  }

  create(newGameEvent: NewGameEvent): Session {
    const session = new Session("1"); // todo auto generate id
    const user = new User(session.users.length + 1, newGameEvent.name);
    session.users.push(user);
    const game = new Game(session);
    this.storyGameRepository.addGame(game);

    return session;
  }

  end(game: number): void {
  }

  join(joinGameEvent: JoinGameEvent): Session {
    // @ts-ignore
    return undefined;
  }

  point(userId: number, gameId: number, point: string): Session {
    // @ts-ignore
    return undefined;
  }
}
