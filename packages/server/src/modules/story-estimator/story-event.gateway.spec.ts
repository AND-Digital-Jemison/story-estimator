import { Test, TestingModule } from '@nestjs/testing';
import { StoryEventFactoryService } from "./story-event-factory.service";
import { StoryEventGateway } from './story-event.gateway';

describe('StoryEventGateway', () => {
  let gateway: StoryEventGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoryEventGateway, {
        provide: StoryEventFactoryService,
        useValue: {}
      }],
    }).compile();

    gateway = module.get<StoryEventGateway>(StoryEventGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
