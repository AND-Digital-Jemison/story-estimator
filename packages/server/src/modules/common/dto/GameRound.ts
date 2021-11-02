import { Round } from '~/modules/common/dto/Round';

export class GameRound extends Round {
  id: number;
  name?: string;
  time?: string;
  note?: string;
}

