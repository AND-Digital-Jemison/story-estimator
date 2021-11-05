import { Test, TestingModule } from '@nestjs/testing';
import { StoryGameIdGeneratorService } from './story-game-id-generator.service';

describe('StoryGameNumberGeneratorService', () => {
  let service: StoryGameIdGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoryGameIdGeneratorService],
    }).compile();

    service = module.get<StoryGameIdGeneratorService>(StoryGameIdGeneratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should have a length of 5 chars", () => {
    const id = service.generate();

    expect(id.length).toBe(4);
  });

});
