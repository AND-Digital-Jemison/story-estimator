import React from 'react';
import { GameContainer, RoomCode, Title } from './game-styles';
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
    <GameContainer>
      <RoomCode>Room Code: 4a5b</RoomCode>
      <div>
        <Title>Planning Poker</Title>
        <Story />
        {users.map(user => (
          <Card key={user.id} user={user} />
        ))}
      </div>
    </GameContainer>
  );
};
