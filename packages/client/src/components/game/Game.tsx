/* eslint-disable react/jsx-key */
import React from 'react';
import {
  CardContainer,
  GameButton,
  GameContainer,
  PlayerCards,
  RoomCode,
  RoomContainer,
  Title,
} from './game-styles';

import { Story } from './Story';
import { Card } from './Card';
import { Points } from './Points'

export const Game = () => {
  // const [users, setUsers] = useState([]);
  const users = [
    { id: 1, name: 'Shuyan', selected: false },
    { id: 2, name: 'Nimra', selected: false },
    { id: 3, name: 'Jack', selected: false },
    { id: 4, name: 'Dale', selected: false },
  ];

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
              <p key={user.name}>{user.name}</p>
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
