import { StoryEvents } from "../../constants";

export class NewGameEvent {
  event = StoryEvents.create;
  name: string;
  title?: string;

  constructor(name: string, title?: string) {
    this.name = name;
    this.title = title;
  }
}
