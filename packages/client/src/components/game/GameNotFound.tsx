import React from 'react';
import { GameNotFoundContainer } from './game-styles';

export const GameNotFound = ({ gameId }) => {
  return (
    <GameNotFoundContainer>
      <img src="/game-not-found.svg"></img>
      <p>Could not find a room with this code: {gameId}</p>
      <a href="/">Create it or join another one</a>
    </GameNotFoundContainer>
  );
};
