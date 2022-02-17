import { Injectable } from '@nestjs/common';
import { WebSocket } from 'ws';
import { CompleteRoundEvent } from './classes/events/complete-round-event';
import { JoinGameEvent } from './classes/events/join-game-event';
import { NewGameEvent } from './classes/events/new-game-event';
import { PointGameEvent } from './classes/events/point-game-event';
import { RevealEvent } from './classes/events/reveal-event';
import { UpdateRoundVotesEvent } from './classes/events/update-round-votes-event';
import { StoryEvents } from './constants/story-events';
import { GameEvent } from './interfaces/game-events.interface';
import { StoryEventHandlerService } from './story-event-handler.service';

@Injectable()
export class StoryEventFactoryService {
  constructor(private readonly storyEventService: StoryEventHandlerService) {}

  handle(client: WebSocket, event: GameEvent) {
    console.log('StoryEventFactoryService, Handling event: ', event);

    switch (event.event) {
      case StoryEvents.create:
        this.storyEventService.create(client, event as NewGameEvent);
        break;
      case StoryEvents.join:
        this.storyEventService.join(client, event as JoinGameEvent);
        break;
      case StoryEvents.point:
        this.storyEventService.point(event as PointGameEvent);
        break;
      case StoryEvents.reveal:
        this.storyEventService.reveal(event as RevealEvent);
        break;
      case StoryEvents.updateRoundVotes:
        // todo : something wrong here?
        this.storyEventService.updateRoundVotes(event as UpdateRoundVotesEvent);
        break;
      case StoryEvents.complete:
        this.storyEventService.complete(event as CompleteRoundEvent);
        break;
      default:
        console.log('Unexpected event type: ', event.event);
    }
  }
}
