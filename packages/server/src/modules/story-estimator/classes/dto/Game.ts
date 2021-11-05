import { Logger } from "@nestjs/common";
import { Session } from "~/modules/story-estimator/classes/dto/Session";
import { WebSocket } from "ws";

export class Game {
  private readonly logger = new Logger(Game.name);

  session: Session;
  lastInteractionTime: Date;
  clients: WebSocket[] = [];

  constructor(session: Session, client: WebSocket) {
    this.session = session;
    this.lastInteractionTime = new Date();
    this.clients.push(client);
  }

  updateClients(): void {
    const broadCastMessage = JSON.stringify(this.session);
    this.sendToClient(broadCastMessage);
  }

  private sendToClient(broadCastMessage: string): void {
    for (const client of this.clients) {
      this.logger.log("broadcast", broadCastMessage);
      client.send(broadCastMessage);
    }
  }
}

