import React from 'react';
import { PointBox, VoteCount } from './game-styles';

const pointBoxColors = ['#ff323c', '#ffc800', '#a050ff', '#5ac328'];

export const Points = ({
  num,
  clickedNum,
  click,
  currentRoundRevealed,
  voteCount,
  index,
  isMostVoted,
}) => {
  return (
    <div>
      {currentRoundRevealed && (
        <VoteCount isMostVoted={isMostVoted} voteCount={voteCount}>
          <span>{voteCount ? voteCount : ''}</span>
        </VoteCount>
      )}

      <PointBox
        borderColor={pointBoxColors[index % pointBoxColors.length]}
        clickedNum={clickedNum}
        num={num}
        onClick={() => click(num)}
      >
        {num}
      </PointBox>
    </div>
  );
};
