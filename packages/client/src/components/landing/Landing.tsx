import React from 'react';
import useWebSocket from '../hooks/web-socket/useWebSocket';
import { CreateGame } from './CreateGame';
import { JoinGame } from './JoinGame';
import { Body, Container, Main, Title } from '../../styling/landing-styles';

export const Landing = () => {
  return (
    <Body>
      <Main>
        <Title>Planning Poker</Title>
        <Container>
          <JoinGame />
          <p>OR</p>
          <CreateGame />
        </Container>
      </Main>
    </Body>
  );
};
