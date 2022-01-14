import React from 'react';
import { ResultBox, StoryContainer } from './game-styles';

export const Story = ({ storyTitle }) => {
  console.log(storyTitle)
  return (
    <StoryContainer>
      <ResultBox>?</ResultBox>
      <p>{storyTitle ? storyTitle : 'Default Story'}</p>
    </StoryContainer>
  );
};