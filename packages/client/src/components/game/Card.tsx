import React from 'react';
import { CardBox } from './game-styles';

export const Card = ({ user }) => {
  return (
    <CardBox hasVoted={user.userRound.hasVoted}>
      {user.userRound.hasVoted ? ' ' : '?'}
    </CardBox>
  );
};
