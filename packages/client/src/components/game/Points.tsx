import React from 'react';
import { PointBox, VoteCount } from './game-styles';

export const Points = ({
  num,
  clickedNum,
  click,
  currentRoundRevealed,
  voteCount,
}) => {
  return (
    <div>
      {currentRoundRevealed && (
        <VoteCount>
          <span>{voteCount ? voteCount : 0}</span>
        </VoteCount>
      )}

      <PointBox clickedNum={clickedNum} num={num} onClick={() => click(num)}>
        {num}
      </PointBox>
    </div>
  );
};
