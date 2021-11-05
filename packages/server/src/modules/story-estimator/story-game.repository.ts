import { Injectable } from '@nestjs/common';
import { Game } from "./classes/dto/Game";

@Injectable()
export class StoryGameRepository {
  private games: Game[] = [];

  public getGame(id: string){
    for (const game of this.games) {
      if(game.session.id === id){
        return game;
      }
    }
    throw new Error('Could not find game');
  }

  public addGame(game: Game){
    this.games.push(game);
  }
}
