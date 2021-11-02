import { Round } from "./Round";

export class User {
  public id: number;
  public name: string;
  public round: Round;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.round = new Round();
  }
}
