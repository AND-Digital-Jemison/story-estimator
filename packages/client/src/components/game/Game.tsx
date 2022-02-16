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
  currentRoundRevealed: boolean;
  story: string;
}

export const Game = () => {
  const [game, setGame] = useState<FullGame | undefined>();
  const [clickedNum, setClickedNum] = useState(null);
  const [currentRoundVotesCount, setCurrentRoundVotesCount] = useState<
    Map<string, number>
  >(new Map());
  const location = useLocation();

  const fiboNums = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55];

  const {
    state: { socket },
  } = useSocket();

  const messageHandler = (event: FullGame): void => {
    // eslint-disable-next-line no-prototype-builtins
    if (!event.hasOwnProperty('event')) {
      setGame(event);

      // current round revealed: count votes
      if (event.currentRoundRevealed) {
        countCurrentRoundVotes(event);
      }
    }
  };

  useEffect(() => {
    socket.connect(messageHandler).then(() => {
      socket.send(location.state as Message);
    });
  }, []);

  const clickNumberEvent = (selectedNumber: number): void => {
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

  const clickRevealEvent = (): void => {
    socket.send({
      event: 'story-event-listener',
      data: {
        event: 'reveal',
        gameId: game.id,
      },
    });
  };

  const isRevealButtonDisabled = (): boolean =>
    game.users.some(user => {
      return user.userRound.hasVoted === false;
    });

  const countCurrentRoundVotes = (event: FullGame): void => {
    const roundVotesCount: Map<string, number> = new Map();

    const roundUsers = event.users;
    roundUsers.forEach(user => {
      const userVote = user.userRound.selectedPoint;

      roundVotesCount[userVote] = roundVotesCount[userVote]
        ? roundVotesCount[userVote] + 1
        : 1;
    });

    setCurrentRoundVotesCount(roundVotesCount);
  };

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
                  <Card
                    key={user.id}
                    user={user}
                    isRevealed={game.currentRoundRevealed}
                  />
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
              {fiboNums.map((num, index) => (
                <Points
                  key={'fibo' + num}
                  num={num}
                  index={index}
                  voteCount={currentRoundVotesCount[num]}
                  currentRoundRevealed={game.currentRoundRevealed}
                  clickedNum={game.currentRoundRevealed ? null : clickedNum}
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
