import { StoryEvents } from '../../constants/story-events';

export class NewGameEvent {
  event = StoryEvents.create;
  name: string;
  story?: string;

  constructor(name: string, story?: string) {
    this.name = name;
    this.story = story;
  }
}
