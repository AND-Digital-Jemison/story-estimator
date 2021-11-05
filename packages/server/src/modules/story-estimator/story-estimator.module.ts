import { Module } from '@nestjs/common';
import { StoryEventFactoryService } from "./story-event-factory.service";
import { StoryEventHandlerService } from "./story-event-handler.service";
import { StoryEventGateway } from "./story-event.gateway";
import { StoryGameRepository } from "./story-game.repository";

@Module({
  providers: [
    StoryEventGateway,
    StoryEventHandlerService,
    StoryEventFactoryService,
    StoryGameRepository,
  ],
})
export class StoryEstimatorModule {}
