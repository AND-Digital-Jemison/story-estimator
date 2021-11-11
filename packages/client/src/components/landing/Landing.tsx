import React from 'react';
import useWebSocket from '../hooks/web-socket/useWebSocket';
import { CreateGame } from './CreateGame';
import { JoinGame } from './JoinGame';
import styled from 'styled-components';

const Title = styled.h1`
  color: #2897ff;
  margin: 0;
`;

const Body = styled.body`
  background-color: #2897ff;
  margin: auto;
  width: auto;
  height: 2000px;
  padding: 100px;
`;

const Main = styled.div`
  background-color: #fff;
  margin: auto;
  width: 598px;
  height: 672px;
  border-radius: 43px;
`;

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
