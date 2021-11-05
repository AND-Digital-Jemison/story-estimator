import { Test, TestingModule } from '@nestjs/testing';
import { StoryEventHandlerService } from './story-event-handler.service';

describe('StoryEventHandlerService', () => {
  let service: StoryEventHandlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoryEventHandlerService],
    }).compile();

    service = module.get<StoryEventHandlerService>(StoryEventHandlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
