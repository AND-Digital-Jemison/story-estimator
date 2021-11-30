/* eslint-disable react/jsx-key */
import React, { useState } from 'react';
import {
  CardContainer,
  GameButton,
  GameContainer,
  Name,
  PlayerCards,
  RoomCode,
  RoomContainer,
  Title,
} from './game-styles';

import { Story } from './Story';
import { Card } from './Card';
import { Points } from './Points';

export const Game = () => {
  const userData = [
    { id: 1, name: 'Shuyan', selected: false, point: null },
    { id: 2, name: 'Nimra', selected: false, point: null },
    { id: 3, name: 'Jack', selected: false, point: null },
    { id: 4, name: 'Dale', selected: false, point: null },
  ];

  const [users, setUsers] = useState(userData);

  const fiboNums = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55];


  return (
    <RoomContainer>
      <RoomCode>Room Code: 4a5b</RoomCode>
      <GameContainer>
        <Title>Planning Poker</Title>
        <Story />
        <CardContainer>
          {users.map(user => (
            <PlayerCards key={user.id + user.name}>
              <Card key={user.id} />
              <Name key={user.name}>{user.name}</Name>
            </PlayerCards>
          ))}
        </CardContainer>
        <GameButton>Reveal</GameButton>
        <CardContainer>
          {fiboNums.map(num => (
            <Points key={'fibo' + num} num={num} />
          ))}
        </CardContainer>
      </GameContainer>
    </RoomContainer>
  );
};
