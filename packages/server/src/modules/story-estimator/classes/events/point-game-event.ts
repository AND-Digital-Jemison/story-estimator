import { StoryEvents } from "../../constants/story-events";

export class PointGameEvent {
  event = StoryEvents.point;
  userId: number;
  gameId: string;
  point: string;

  constructor(point: string, userId: number, gameId: string) {
    this.userId = userId;
    this.point = point;
    this.gameId = gameId;
  }
}
