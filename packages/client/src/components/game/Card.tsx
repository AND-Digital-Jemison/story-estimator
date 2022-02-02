import React from 'react';
import { CardBox } from './game-styles';

export const Card = ({ user, isRevealed }) => {
  const point = isRevealed ? user.userRound.selectedPoint : ''

  return (
    <CardBox isRevealed={isRevealed} hasVoted={user.userRound.hasVoted}>
      {user.userRound.hasVoted ? point : '?'}
    </CardBox>
  );
};
