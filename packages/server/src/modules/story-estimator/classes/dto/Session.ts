import { GameRound } from "./GameRound";
import { User } from "./User";

export class Session {
  id: string;
  users: User[];
  rounds: GameRound[];
  currentRound: GameRound;

  constructor(id: string) {
    this.id = id;
    this.users = [];
    this.rounds = [];
    this.currentRound = new GameRound(1);
  }
}



