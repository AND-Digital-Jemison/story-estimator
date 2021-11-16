import { UserRound } from "./UserRound";

export class User {
  public id: number;
  public name: string;

  public userRound: UserRound;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.userRound = new UserRound();
  }
}


