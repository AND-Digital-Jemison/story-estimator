import React from 'react';
import useWebSocket from '../hooks/web-socket/useWebSocket';
import { CreateGame } from './CreateGame';
import styled from 'styled-components';

const Title = styled.h1`
  color: #2897ff;
`;

export const Landing = () => {
  return (
    <>
      <Title>Planning Poker</Title>
      <CreateGame />
      <form>
        <label>Got a room code?</label>
        <input type="text" name="room-code-name" />
        <button>JOIN</button>
      </form>
    </>
  );
};
