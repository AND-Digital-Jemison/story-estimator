import { JoinGameEvent, NewGameEvent } from "../classes";
import {  Session } from "../classes/dto";

export interface GameEvents {
  create: (newGameEvent: NewGameEvent) => Session;
  join: (joinGameEvent: JoinGameEvent) => Session;
  point: (userId: number, gameId: number, point: string) => Session;
  complete: (gameId: number, point: string) => Session;
  end: (game: number) => void;
}

// export type GameEvent = NewGameEvent | JoinGameEvent;

