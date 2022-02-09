/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useSocket } from '~/components/hooks/web-socket/socket-context';
import { Message } from '~/components/hooks/web-socket/types';
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

interface CurrentRound {
  selectedPoint?: string;
  hasVoted: boolean;
}

interface User {
  id: number;
  name: string;
  userRound: CurrentRound;
}

interface FullGame {
  id: string;
  users: User[];
  rounds: [];
  currentRound: CurrentRound;
  story: string;
}

export const Game = () => {
  const [game, setGame] = useState<FullGame | undefined>();
  const [clickedNum, setClickedNum] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const location = useLocation();

  const {
    state: { socket },
  } = useSocket();

  const messageHandler = event => {
    // eslint-disable-next-line no-prototype-builtins
    if (!event.hasOwnProperty('event')) {
      setGame(event);
    }
  };

  useEffect(() => {
    socket.connect(messageHandler).then(() => {
      socket.send(location.state as Message);
    });
  }, []);

  const fiboNums = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55];

  const clickNumberEvent = selectedNumber => {
    const userId: number = game.users.find(
      user => user.name === location.state.data.name
    )?.id;
    socket.send({
      event: 'story-event-listener',
      data: {
        event: 'point',
        userId,
        gameId: game.id,
        point: clickedNum === selectedNumber ? null : selectedNumber,
      },
    });
    // eslint-disable-next-line no-unused-expressions
    clickedNum === selectedNumber
      ? setClickedNum(null)
      : setClickedNum(selectedNumber);
  };

  const clickRevealEvent = () => {
    // if all users has voted, then;
    setIsRevealed(true);
    setClickedNum(null);
  };

  const isRevealButtonDisabled = (): boolean =>
    game.users.some(user => {
      return user.userRound.hasVoted === false;
    });

  return (
    <div>
      {game ? (
        <RoomContainer>
          <RoomCode>Room Code: {game.id}</RoomCode>
          <GameContainer>
            <Title>Planning Poker</Title>
            <Story storyTitle={game.story} />
            <CardContainer>
              {game.users.map(user => (
                <PlayerCards key={user.id + user.name}>
                  <Card key={user.id} user={user} isRevealed={isRevealed} />
                  <Name key={user.name}>{user.name}</Name>
                </PlayerCards>
              ))}
            </CardContainer>
            <GameButton
              disabled={isRevealButtonDisabled()}
              onClick={clickRevealEvent}
            >
              Reveal
            </GameButton>
            <CardContainer>
              {fiboNums.map(num => (
                <Points
                  key={'fibo' + num}
                  num={num}
                  clickedNum={clickedNum}
                  click={clickNumberEvent}
                />
              ))}
            </CardContainer>
          </GameContainer>
        </RoomContainer>
      ) : (
        <div>Connecting</div>
      )}
    </div>
  );
};
