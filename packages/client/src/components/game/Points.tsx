import React from 'react';
import { PointBox } from './game-styles';

export const Points = ({num, click}) => {
  return <PointBox onClick={() => click(num)}>{num}</PointBox>;
};
