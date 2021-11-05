import { Injectable } from "@nestjs/common";
import { WebSocket } from "ws";
import { CompleteRoundEvent, JoinGameEvent, NewGameEvent, PointGameEvent } from "~/modules/story-estimator/classes/events";
import { StoryEvents } from "~/modules/story-estimator/constants/story-events";
import { GameEvent } from "~/modules/story-estimator/interfaces/game-events.interface";
import { StoryEventHandlerService } from "~/modules/story-estimator/story-event-handler.service";

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
    } else if(StoryEvents.point === event.event){
       this.storyEventService.point(event as PointGameEvent);
    } else if(StoryEvents.complete === event.event){
       this.storyEventService.complete(event as CompleteRoundEvent);
    }
  }
}
