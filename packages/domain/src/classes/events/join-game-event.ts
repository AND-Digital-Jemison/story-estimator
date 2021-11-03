import { StoryEvents } from "../../constants";

export class JoinGameEvent {
  event = StoryEvents.join;
  name: string;
  id: string;

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}
