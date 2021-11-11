import React from 'react';
import useWebSocket from '../hooks/web-socket/useWebSocket';
import { CreateGame } from './CreateGame';
import { JoinGame } from './JoinGame';
import {Title, Body, Main}  from '../../styling/landing-styles';

export const Landing = () => {
  return (
    <Body>
      <Main>
        <Title>Planning Poker</Title>
        <JoinGame />
        <CreateGame />
      </Main>
    </Body>
  );
};
