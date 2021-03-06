import { StoryEvents } from "../../constants/story-events";

export class JoinGameEvent {
  event = StoryEvents.join;
  name: string;
  gameId: string;

  constructor(name: string, gameId: string) {
    this.name = name;
    this.gameId = gameId;
  }
}
