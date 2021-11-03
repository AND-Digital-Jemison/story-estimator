export class Game {
  session: Session;
  lastInteractionTime: Date;

  constructor(session: Session) {
    this.session = session;
    this.lastInteractionTime = new Date();
  }
}

import { Session } from "./Session";

