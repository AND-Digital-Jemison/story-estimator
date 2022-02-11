import { Round } from './Round';
import { User } from './User';

export class Session {
  id: string;
  users: User[];
  rounds: Round[];
  currentRound: Round;
  currentRoundRevealed: boolean;
  story?: string;

  constructor(id: string, story?: string) {
    this.id = id;
    this.users = [];
    this.rounds = [];
    this.currentRound = new Round(1);
    this.currentRoundRevealed = false;
    this.story = story;
  }
}
