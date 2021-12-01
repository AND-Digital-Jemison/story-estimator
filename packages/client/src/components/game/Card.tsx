import React from 'react';
import { CardBox } from './game-styles';

export const Card = ( {user} ) => {
  return (
    <CardBox selected={user.selected}>{user.selected ? ' ' : '?'}</CardBox>
  );
};
