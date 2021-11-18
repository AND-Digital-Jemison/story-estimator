import { UserRound } from "./UserRound";

export class Round extends UserRound {
  id: number;
  name?: string;
  time?: string;
  note?: string;

  constructor(id: number) {
    super();
    this.id = id;
  }
}

