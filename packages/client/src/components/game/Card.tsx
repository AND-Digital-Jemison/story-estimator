import React from 'react';
import { CardBox } from './game-styles';

export const Card = ( {user} ) => {
  return <CardBox>{user.selected ? ' ' : '?'}</CardBox>;
};
