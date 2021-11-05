import { StoryEvents } from "../../constants/story-events";

export class JoinGameEvent {
  event = StoryEvents.join;
  userName: string;
  gameId: string;

  constructor(name: string, gameId: string) {
    this.userName = name;
    this.gameId = gameId;
  }
}
