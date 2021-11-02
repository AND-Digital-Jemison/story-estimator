import { User } from '~/modules/common/dto/User';
import { GameRound } from '~/modules/common/dto/GameRound';

export class Session {
  id: string;
  users: User[];
  rounds: GameRound[];

  constructor() {
    this.users = [];
    this.rounds = [];
  }
}


