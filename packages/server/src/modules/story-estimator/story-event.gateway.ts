 // import { GameEvent } from "@nest-react/domain";
import { Logger } from "@nestjs/common";
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, WebSocket } from "ws";
import { StoryEventFactoryService } from "~/modules/story-estimator/story-event-factory.service";

@WebSocketGateway(8001)
export class StoryEventGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private server: Server;
  private count = 0;
  private clients: WebSocket[] = [];
  private readonly logger = new Logger(StoryEventGateway.name);

  constructor(private readonly eventFactory: StoryEventFactoryService) {
  }

  handleConnection(client: WebSocket): void {
    this.clients.push(client);
    client.send("connected");
    this.logger.log("handleConnection");
  }

  handleDisconnect(client: WebSocket): void {
    this.logger.log("handleDisconnect");

    for (let i = 0; i < this.clients.length; i++) {
      if (this.clients[i] === client) {
        this.clients.splice(i, 1);
        break;
      }
    }
    client.send("disconnected");
  }

  @SubscribeMessage("story-event-listener")
  onEvent(@MessageBody() data: any): void {
    const session = this.eventFactory.handle(data);
    this.broadcast(session);
  }


  private broadcast(message: any): void {
    const broadCastMessage = JSON.stringify(message);
    for (const client of this.clients) {
      this.logger.log("broadcast", broadCastMessage);
      client.send(broadCastMessage);
    }
  }
}
