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
    throw new Error('Could not find game');
  }

  public addGame(game: Game): void {
    this.games.push(game);
    console.log('All games', this.games);
  }

  public getExistingGameIds(): string[] {
    return this.games.map(game => game.session.id);
  }
}
