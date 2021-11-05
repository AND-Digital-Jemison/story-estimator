import { useCallback, useState } from 'react';
import { Socket } from './types';

const useWebSocket = (): Socket => {
  const [response, setResponse] = useState({});
  const socketUrl = 'ws://localhost:8000';
  const socket = new WebSocket(socketUrl);

  const connect = useCallback(() => {
    socket.onopen = () => {
      console.log('Connected');

      socket.onerror = (error: any) => {
        console.error(error);
      };

      socket.onmessage = (event: any) => {
        console.log('Data: ', event.data);
        setResponse(JSON.parse(event.data));
      };

      socket.onclose = () => {
        console.log('Disconnected');
      };
    };
  }, [socketUrl]);

  const send = useCallback(
    (data: any) => {
      try {
        socket.send(JSON.stringify(data));
      } catch (error) {
        console.error(error);
      }
    },
    [socketUrl]
  );

  return { connect, send, response };
};

export default useWebSocket;
