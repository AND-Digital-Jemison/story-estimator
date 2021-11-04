import { Module } from "@nestjs/common";

import { ConfigModule } from "./config/config.module";
import { StatusModule } from "./status/status.module";
import { StoryEstimatorModule } from "./story-estimator/story-estimator.module";

@Module({
  imports: [ConfigModule, StatusModule, StoryEstimatorModule],
  providers: []
})
export class APIModule {
}
