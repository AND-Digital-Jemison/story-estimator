import { Module } from "@nestjs/common";
import { StoryEventFactoryService } from "~/modules/story-estimator/story-event-factory.service";
import { StoryEventHandlerService } from "~/modules/story-estimator/story-event-handler.service";
import { StoryEventGateway } from "~/modules/story-estimator/story-event.gateway";
import { StoryGameRepository } from "~/modules/story-estimator/story-game.repository";

@Module({
  providers: [StoryEventGateway, StoryEventHandlerService, StoryEventFactoryService, StoryGameRepository]
})
export class StoryEstimatorModule {
}
