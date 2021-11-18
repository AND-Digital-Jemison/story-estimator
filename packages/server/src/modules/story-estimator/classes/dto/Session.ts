import { Round } from "./Round";
import { User } from "./User";

export class Session {
  id: string;
  users: User[];
  rounds: Round[];
  currentRound: Round;

  constructor(id: string) {
    this.id = id;
    this.users = [];
    this.rounds = [];
    this.currentRound = new Round(1);
  }
}



