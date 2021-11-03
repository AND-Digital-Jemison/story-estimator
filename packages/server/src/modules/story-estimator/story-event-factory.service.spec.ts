import { Test, TestingModule } from '@nestjs/testing';
import { StoryEventFactoryService } from './story-event-factory.service';

describe('StoryEventFactoryService', () => {
  let service: StoryEventFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoryEventFactoryService],
    }).compile();

    service = module.get<StoryEventFactoryService>(StoryEventFactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
