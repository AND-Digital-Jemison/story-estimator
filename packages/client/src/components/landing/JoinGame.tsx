import React, {useEffect, useState} from 'react';
import {Socket} from '../hooks/web-socket/types';
import useWebSocket from '../hooks/web-socket/useWebSocket';

export const JoinGame = () => {
  const [joinGameData, setJoinGameData] = useState({
    name: '',
    roomCode: '',
  });

  const socket = useWebSocket();

  const handleClick = () => {
    socket.send(joinGameData);
  };

  return (
    <form>
      <label>Name:</label>
      <input
        type="text"
        name="user-name"
        value={joinGameData.name}
        onChange={event =>
          setJoinGameData({...joinGameData, name: event.target.value})
        }
      />
      <label>Room code:</label>
      <input
        type="text"
        name="room-code"
        onChange={event =>
          setJoinGameData({...joinGameData, roomCode: event.target.value})
        }
      />
      <button onClick={handleClick}>JOIN</button>
    </form>
  );
};
