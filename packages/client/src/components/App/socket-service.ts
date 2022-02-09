import { Message } from '~/components/hooks/web-socket/types';

export class SocketService {
  private socketUrl = 'ws://localhost:8001';
  private socket;
  public event;
  private messageCallback;

  connect = async (messageHandler: (event) => void) => {
    this.messageCallback = messageHandler;

    return new Promise((resolve, reject) => {
      this.socket = new WebSocket(this.socketUrl);
      this.socket.onopen = () => {
        this.log('connection opened.');
        resolve(this.socket);
      };

      this.socket.onerror = error => reject(error);

      this.socket.onmessage = (event: any) => {
        this.log('Received msg: ', event.data);
        this.event = event;
        this.messageCallback(JSON.parse(event.data));
      };
    });
  };

  send = (message: Message | any) => {
    try {
      const msg = JSON.stringify(message);
      this.log('Sending msg:', msg);
      this.socket.send(msg);
    } catch (error) {
      console.error(error);
    }
  };

  log = (...msg) => {
    console.log(`SocketService: `, msg);
  };
}
