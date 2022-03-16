import { Injectable } from '@nestjs/common';
import { Game } from './classes/dto/Game';

@Injectable()
export class StoryGameRepository {
  private games: Game[] = [];

  public getGame(id: string): Game {
    console.log('find game', id);
    for (const game of this.games) {
      if (game.session.id === id) {
        return game;
      }
    }
    console.log('Could not find game: ', id);

    return null;
  }

  public getGamesLastInteractionMap() {
    return this.games.map(game => {
      return {
        gameId: game.session.id,
        lastInteraction: new Date(game.lastInteractionTime).getTime(),
      };
    });
  }

  public addGame(game: Game): void {
    this.games.push(game);
    console.log('All games', this.games);
  }

  public deleteGame(gameId: string): void {
    this.games = this.games.filter(game => game.session.id !== gameId);
  }

  public getExistingGameIds(): string[] {
    return this.games.map(game => game.session.id);
  }
}
