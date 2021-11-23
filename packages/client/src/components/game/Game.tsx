import React from 'react';
import { GameContainer, RoomCode, Title } from './game-styles';
import { Story } from './Story';
import { Card } from './Card';

export const Game = () => {
  return (
    <GameContainer>
      <RoomCode>Room Code: 4a5b</RoomCode>
      <div>
        <Title>Planning Poker</Title>
        <Story />
        <Card />
      </div>
    </GameContainer>
  );
};