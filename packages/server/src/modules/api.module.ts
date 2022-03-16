import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { ConfigModule } from './config/config.module';
import { StatusModule } from './status/status.module';
import { StoryEstimatorModule } from './story-estimator/story-estimator.module';

@Module({
  imports: [
    ConfigModule,
    StatusModule,
    StoryEstimatorModule,
    ScheduleModule.forRoot(),
  ],
})
export class APIModule {}
