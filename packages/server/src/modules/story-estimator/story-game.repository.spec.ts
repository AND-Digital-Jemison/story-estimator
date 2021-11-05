import { Test, TestingModule } from '@nestjs/testing';
import { StoryGameRepository } from "./story-game.repository";

describe('StoryGame.RepositoryService', () => {
  let service: StoryGameRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoryGameRepository],
    }).compile();

    service = module.get<StoryGameRepository>(StoryGameRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
