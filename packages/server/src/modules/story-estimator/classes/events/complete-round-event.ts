import { StoryEvents } from "../../constants/story-events";

export class CompleteRoundEvent {
  event = StoryEvents.complete;
  gameId: string;
  point: string;
  title?: string;

  constructor(gameId: string, point: string, title?: string) {
    this.gameId = gameId;
    this.point = point;
    this.title = title;
  }
}
