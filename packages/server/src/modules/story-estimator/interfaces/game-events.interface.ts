import { Session } from "~/modules/story-estimator/classes/dto";
import { CompleteRoundEvent, JoinGameEvent, NewGameEvent, PointGameEvent } from "~/modules/story-estimator/classes/events";

export interface GameEvents {
  create: (event: NewGameEvent) => Session;
  join: (event: JoinGameEvent) => Session;
  point: (event: PointGameEvent) => Session;
  complete: (event: CompleteRoundEvent) => Session;
  end: (gameId: string) => void;
}

export type GameEvent = NewGameEvent | JoinGameEvent | PointGameEvent | CompleteRoundEvent;

