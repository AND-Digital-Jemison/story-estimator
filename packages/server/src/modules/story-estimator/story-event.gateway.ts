
// import { GameEvent } from "@nest-react/domain";
import { Logger } from "@nestjs/common";
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, WebSocket } from "ws";
import { StoryEvents } from "./constants/story-events";
import { StoryEventFactoryService } from "./story-event-factory.service";

@WebSocketGateway(8001)
export class StoryEventGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private server: Server;
  //  private clients: WebSocket[] = [];
  private readonly logger = new Logger(StoryEventGateway.name);

  constructor(private readonly eventFactory: StoryEventFactoryService) {
  }

  handleConnection(client: WebSocket): void {
    this.logger.log("handleConnection");
    //  this.clients.push(client);
    // TODO

    client.send(JSON.stringify({ event: StoryEvents.connected }));
  }

  handleDisconnect(client: WebSocket): void {
    this.logger.log("handleDisconnect");
    // TODO
    /*
      find client
      remove them from the game
     */

    /* for (let i = 0; i < this.clients.length; i++) {
       if (this.clients[i] === client) {
         this.clients.splice(i, 1);
         break;
       }
     }
     client.send({event: StoryEvents.disonnected});*/
  }

  @SubscribeMessage("story-event-listener")
  onEvent(client: WebSocket, data: any): void {
    console.log(`Client: ${client}`);
    console.log(`Data: ${data}`);

    this.eventFactory.handle(client, data);
  }

}
