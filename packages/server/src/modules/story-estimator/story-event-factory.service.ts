// import { GameEvent } from "@nest-react/domain";
import { Injectable } from '@nestjs/common';
import { StoryEventHandlerService } from "~/modules/story-estimator/story-event-handler.service";

@Injectable()
export class StoryEventFactoryService {

  constructor(private readonly storyEventService: StoryEventHandlerService) {
  }

  handle(event: any) {
    console.log('handler', event);
    return this.storyEventService.create(event);
  }
}
