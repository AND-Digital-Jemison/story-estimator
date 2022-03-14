import { Injectable } from '@nestjs/common';
import { StoryGameRepository } from './story-game.repository';

@Injectable()
export class StoryGameIdGeneratorService {
  private gameIdLength = 4;

  constructor(private readonly storyGameRepository: StoryGameRepository) {}

  public generate(): string {
    const existingGameIds = this.storyGameRepository.getExistingGameIds();
    let newGameId: string;

    while (!newGameId) {
      const id = Math.random()
        .toString(36)
        .slice(2, this.gameIdLength + 2);

      if (!existingGameIds.includes(id)) {
        newGameId = id;
      }
    }

    return newGameId;
  }
}
