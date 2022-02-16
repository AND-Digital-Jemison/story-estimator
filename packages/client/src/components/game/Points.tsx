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
        <VoteCount voteCount={voteCount}>
          <span>{voteCount ? voteCount : ''}</span>
        </VoteCount>
      )}

      <PointBox clickedNum={clickedNum} num={num} onClick={() => click(num)}>
        {num}
      </PointBox>
    </div>
  );
};
