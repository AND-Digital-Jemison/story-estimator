import React from 'react';
import { ResultBox, StoryContainer } from './game-styles';

export const Story = ({ storyTitle, mostVoted }) => {
  return (
    <StoryContainer>
      <ResultBox>{mostVoted ? mostVoted : '?'}</ResultBox>
      <p>{storyTitle ? storyTitle : 'Some cool story'}</p>
    </StoryContainer>
  );
};
