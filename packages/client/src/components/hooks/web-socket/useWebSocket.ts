import { useRef, useState } from 'react';
import { Message, Socket } from './types';

const useWebSocket = (): Socket => {
  const [response, setResponse] = useState({});
  const socketUrl = 'ws://localhost:8001';
  const socket = useRef(new WebSocket(socketUrl));
  console.log('new socket');

  const connect = () => {
    socket.current.onopen = () => {
      console.log('Connected');

      socket.current.onerror = (error: any) => {
        console.error(error);
      };

      socket.current.onmessage = (event: any) => {
        console.log('Data: ', event.data);
        setResponse(JSON.parse(event.data));
      };

      socket.current.onclose = () => {
        console.log('Disconnected');
      };
    };
  };

  const send = (message: Message) => {
    try {
      socket.current.send(JSON.stringify(message));
    } catch (error) {
      console.error(error);
    }
  }

  return { connect, send, response };
};

export default useWebSocket;
