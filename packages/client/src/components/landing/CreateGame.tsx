import React, { useEffect, useState } from 'react';
import { Socket } from '../hooks/web-socket/types';
import useWebSocket from '../hooks/web-socket/useWebSocket';

export const CreateGame = () => {
  const [newGameData, setNewGameData] = useState({
    name: '',
    roundName: '',
  });

  const socket = useWebSocket();

  const handleClick = () => {
    socket.send(newGameData);
  };

  return (
    <form>
      <label>Name:</label>
      <input
        type="text"
        name="user-name"
        value={newGameData.name}
        onChange={event =>
          setNewGameData({ ...newGameData, name: event.target.value })
        }
      />

      <label>Round Name:</label>
      <input
        type="text"
        name="round-name"
        onChange={event =>
          setNewGameData({ ...newGameData, roundName: event.target.value })
        }
      />
      <button onClick={handleClick}>CREATE</button>
    </form>
  );
};
