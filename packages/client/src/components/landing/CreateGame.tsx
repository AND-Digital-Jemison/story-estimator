import React, { useState } from 'react';
import { UserModel } from '~/models/UserModel';
import useWebSocket from '../hooks/web-socket/useWebSocket';

export const CreateGame = () => {
  const [user, setUser] = useState<UserModel>();
  const socket = useWebSocket();

  const handleClick = () => {
    socket.send(user);
  };

  return (
    <form>
      <label htmlFor="username-input">Name:</label>
      <input
        id="username-input"
        type="text"
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
      <button onClick={handleClick}>CREATE</button>
    </form>
  );
};
