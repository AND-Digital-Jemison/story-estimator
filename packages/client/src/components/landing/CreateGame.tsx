import React, {useEffect, useState} from 'react';
import {Socket} from '../hooks/web-socket/types';
import useWebSocket from '../hooks/web-socket/useWebSocket';

export const CreateGame = () => {
  const [createGameData, setCreateGameData] = useState({
    name: '',
    roundName: '',
  });
  const socket = useWebSocket();

  const handleClick = () => {
    socket.send(createGameData);
  };

  return (
    <form>
      <label>Round Name:</label>
      <input
        type="text"
        name="round-name"
        onChange={event =>
          setCreateGameData({...createGameData, roundName: event.target.value})
        }
      />
      <button onClick={handleClick}>CREATE</button>
    </form>
  );
};
