import { Test, TestingModule } from '@nestjs/testing';
import { StoryEventGateway } from './story-event.gateway';

describe('StoryEventGateway', () => {
  let gateway: StoryEventGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoryEventGateway],
    }).compile();

    gateway = module.get<StoryEventGateway>(StoryEventGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
