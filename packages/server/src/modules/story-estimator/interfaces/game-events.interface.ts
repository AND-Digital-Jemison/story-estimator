import { CompleteRoundEvent } from "../classes/events/complete-round-event";
import { JoinGameEvent } from "../classes/events/join-game-event";
import { NewGameEvent } from "../classes/events/new-game-event";
import { PointGameEvent } from "../classes/events/point-game-event";
import { Session } from "../classes/dto/Session";

export interface GameEvents {
  create: (event: NewGameEvent) => Session;
  join: (event: JoinGameEvent) => Session;
  point: (event: PointGameEvent) => Session;
  reveal: (event: PointGameEvent) => Session;
  complete: (event: CompleteRoundEvent) => Session;
  end: (gameId: string) => void;
}

export type GameEvent = NewGameEvent | JoinGameEvent | PointGameEvent | CompleteRoundEvent;

