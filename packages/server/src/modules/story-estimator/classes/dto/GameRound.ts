import { Round } from "./Round";

export class GameRound extends Round {
  id: number;
  name?: string;
  time?: string;
  note?: string;

  constructor(id: number) {
    super();
    this.id = id;
  }
}

