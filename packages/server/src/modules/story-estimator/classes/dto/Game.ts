import { Logger } from '@nestjs/common';
import { WebSocket } from 'ws';
import { Session } from './Session';

class SessionWithEvent {
  session: Session;
  event: string;

  constructor(session: Session, event: string) {
    this.session = session;
    this.event = event;
  }
}

export class Game {
  private readonly logger = new Logger(Game.name);

  session: Session;
  lastInteractionTime: Date;
  clients: WebSocket[] = [];
  expectedGame: any;

  constructor(session: Session, client: WebSocket) {
    this.session = session;
    this.lastInteractionTime = new Date();
    this.clients.push(client);
  }

  updateClients(event: string): void {
    const msg = new SessionWithEvent(this.session, event);

    const broadCastMessage = JSON.stringify(msg);
    this.sendToClient(broadCastMessage);
  }

  private sendToClient(broadCastMessage: string): void {
    for (const client of this.clients) {
      this.logger.log('broadcast', broadCastMessage);
      client.send(broadCastMessage);
    }
  }
}
