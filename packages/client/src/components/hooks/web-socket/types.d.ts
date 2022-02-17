export interface Message {
  event: string;
  data: any;
}

export interface ISocketService {
  connect: (messageHandler: (event) => void) => void;
  send: (message: Message) => void;
}
