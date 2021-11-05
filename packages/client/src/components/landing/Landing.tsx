import React from 'react';
import useWebSocket from '../hooks/web-socket/useWebSocket';
import { CreateGame } from './CreateGame';

export const Landing = () => {
  return (
    <>
      <h1>Planning Poker</h1>
      <CreateGame />
      <form>
        <label>Got a room code?</label>
        <input type="text" name="room-code-name" />
        <button>JOIN</button>
      </form>
    </>
  );
};
