import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { StoryGameRepository } from './story-game.repository';

@Injectable()
export class GamesManagerService {
  private readonly logger = new Logger('Manager');
  private GAME_TTL = 0.002; // games with last interaction > 5 hours will be deleted

  constructor(private storyGameIdGeneratorService: StoryGameRepository) {}

  @Cron(CronExpression.EVERY_SECOND)
  handleCron(): void {
    const now = new Date().getTime();
    const gamesActiveTimes =
      this.storyGameIdGeneratorService.getGamesLastInteractionMap();

    gamesActiveTimes.forEach(game => {
      const gameHours = Math.abs(now - game.lastInteraction) / 36e5;

      if (gameHours > this.GAME_TTL) {
        this.logger.log(`deleting game:  ${game.gameId}`);
        this.storyGameIdGeneratorService.deleteGame(game.gameId);
      }
    });
  }
}
