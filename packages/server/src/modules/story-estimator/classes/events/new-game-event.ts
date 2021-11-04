import { StoryEvents } from "~/modules/story-estimator/constants/story-events";

export class NewGameEvent {
  event = StoryEvents.create;
  name: string;
  title?: string;

  constructor(name: string, title?: string) {
    this.name = name;
    this.title = title;
  }
}
