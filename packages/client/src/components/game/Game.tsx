/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
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
  currentRoundVotesCount?: RoundVotesCount;
}

interface FullGameWithEvent {
  session: FullGame;
  event: string;
}

interface RoundVotesCount {
  mostVoted: number;
  votesCount: Map<string, number>;
}

export const Game = () => {
  const [game, setGame] = useState<FullGame | undefined>();
  const [clickedNum, setClickedNum] = useState(null);
  const location = useLocation();
  const history = useHistory();

  const fiboNums = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55];

  const {
    state: { socket },
  } = useSocket();

  const messageHandler = (gameWithEvent: FullGameWithEvent): void => {
    const fullGame = gameWithEvent.session;
    const event = gameWithEvent.event;

    // eslint-disable-next-line no-prototype-builtins
    if (!fullGame?.hasOwnProperty('event')) {
      setGame(fullGame);

      if (event === 'complete') {
        setClickedNum(null);
      }
    }
  };

  useEffect(() => {
    // redirect to landing page if user skipped it
    if (!location.state) {
      history.push('/');
      return;
    }

    socket.connect(messageHandler).then(() => {
      socket.send(location.state as Message);
    });
  }, []);

  const clickNumberEvent = (selectedNumber: number): void => {
    if (game.currentRoundRevealed) {
      // Click number to update final votes
      if (game.currentRoundVotesCount.mostVoted) {
        const newCurrentRoundVotesCount = {
          ...game.currentRoundVotesCount,
          mostVoted: selectedNumber,
        };

        socket.send({
          event: 'story-event-listener',
          data: {
            event: 'update-round-votes',
            gameId: game.id,
            currentRoundVotesCount: newCurrentRoundVotesCount,
          },
        });

        return;
      }
    } else {
      // Point event
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
    }
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

  const clickConfirmEvent = (): void => {
    socket.send({
      event: 'story-event-listener',
      data: {
        event: 'complete',
        gameId: game.id,
        point: game.currentRoundVotesCount.mostVoted,
        title: game.story,
      },
    });
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
            <Story
              storyTitle={game.story}
              mostVoted={game.currentRoundVotesCount?.mostVoted}
            />
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
              onClick={
                game.currentRoundRevealed ? clickConfirmEvent : clickRevealEvent
              }
            >
              {game.currentRoundRevealed ? 'Confirm' : 'Reveal'}
            </GameButton>
            <CardContainer>
              {fiboNums.map((num, index) => (
                <Points
                  key={'fibo' + num}
                  num={num}
                  index={index}
                  isMostVoted={game.currentRoundVotesCount?.mostVoted === num}
                  voteCount={game.currentRoundVotesCount?.votesCount[num]}
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
