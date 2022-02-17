import { CompleteRoundEvent } from '../classes/events/complete-round-event';
import { JoinGameEvent } from '../classes/events/join-game-event';
import { NewGameEvent } from '../classes/events/new-game-event';
import { PointGameEvent } from '../classes/events/point-game-event';
import { UpdateRoundVotesEvent } from '../classes/events/update-round-votes-event';
import { RevealEvent } from '../classes/events/reveal-event';

export type GameEvent =
  | NewGameEvent
  | JoinGameEvent
  | PointGameEvent
  | RevealEvent
  | UpdateRoundVotesEvent
  | CompleteRoundEvent;
