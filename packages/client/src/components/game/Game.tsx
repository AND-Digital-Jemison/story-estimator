import React from 'react';
import {
  CardContainer,
  GameContainer,
  RevealButton,
  RoomCode,
  RoomContainer,
  Title,
} from './game-styles';

import { Story } from './Story';
import { Card } from './Card';

export const Game = () => {
  // const [users, setUsers] = useState([]);
  const users = [
    { id: 1, name: 'shuyan', selected: false },
    { id: 2, name: 'nimra', selected: false },
    { id: 3, name: 'jack', selected: false },
    { id: 4, name: 'dale', selected: false },
  ];
  return (
    <RoomContainer>
      <RoomCode>Room Code: 4a5b</RoomCode>
      <GameContainer>
        <Title>Planning Poker</Title>
        <Story />
        <CardContainer>
          {users.map(user => (
            <Card key={user.id} user={user} />
          ))}
        </CardContainer>
        <RevealButton>Reveal</RevealButton>
      </GameContainer>
    </RoomContainer>
  );
};
