import { Message } from '~/components/hooks/web-socket/types';

export class SocketService {
  private socketUrl = 'ws://localhost:8001';
  private socket;
  public event;
  private messageCallback;

  connect2 = async (messageHandler: (event) => void ) => {
    this.messageCallback = messageHandler;

    return new Promise((resolve, reject) => {
      this.socket = new WebSocket(this.socketUrl);
      console.log(this.socket)
      this.socket.onopen = () => {
        console.log("connected");
        resolve(this.socket);
      };

      this.socket.onerror = error => reject(error);

      this.socket.onmessage = (event: any) => {
        console.log('RECEIVED: ', event.data);
        this.event = event;
        this.messageCallback(JSON.parse(event.data));
      };
    })
  }

  connect = () => {
    this.socket = new WebSocket(this.socketUrl);
    console.log('connect', this.socket);
    this.socket.onopen = () => {
      console.log('Connected');

      this.socket.onerror = (error: any) => {
        console.error(error);
      };

      this.socket.onmessage = (event: any) => {
        console.log('Data: ', event.data);
        this.event = event;
      };

      this.socket.onclose = () => {
        console.log('Disconnected');
      };
    };
  };

  send = (message: Message | any) => {
    try {
      const msg = JSON.stringify(message);
      console.log('sending', msg);
      this.socket.send(msg);
    } catch (error) {
      console.error(error);
    }
  };
}
