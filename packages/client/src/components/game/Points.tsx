import React from 'react';
import { PointBox } from './game-styles';

export const Points = ({num, clickedNum, click}) => {
  return (
    <PointBox clickedNum={clickedNum} num={num} onClick={() => click(num)}>
      {num}
    </PointBox>
  );
};
