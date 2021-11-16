import { Injectable } from "@nestjs/common";
import { WebSocket } from "ws";
import { CompleteRoundEvent } from "./classes/events/complete-round-event";
import { JoinGameEvent } from "./classes/events/join-game-event";
import { NewGameEvent } from "./classes/events/new-game-event";
import { PointGameEvent } from "./classes/events/point-game-event";
import { StoryEvents } from "./constants/story-events";
import { GameEvent } from "./interfaces/game-events.interface";
import { StoryEventHandlerService } from "./story-event-handler.service";

@Injectable()
export class StoryEventFactoryService {

   constructor(private readonly storyEventService: StoryEventHandlerService) {
   }

   handle(client: WebSocket, event: GameEvent) {
      console.log("handler", event);
      if (StoryEvents.create === event.event) {
         this.storyEventService.create(client, event as NewGameEvent);
      } else if (StoryEvents.join === event.event) {
         this.storyEventService.join(client, event as JoinGameEvent);
      } else if (StoryEvents.point === event.event) {
         this.storyEventService.point(event as PointGameEvent);
      } else if (StoryEvents.complete === event.event) {
         this.storyEventService.complete(event as CompleteRoundEvent);
      }
   }
}
