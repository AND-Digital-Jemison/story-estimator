import { StoryEvents } from "../../constants/story-events";

export class RevealEvent {
  event = StoryEvents.reveal;
  gameId: string;

  constructor(gameId: string) {
    this.gameId = gameId;
  }
}