import React from 'react';
import { ResultBox, StoryContainer } from './game-styles';

export const Story = () => {
  return (
    <StoryContainer>
      <ResultBox>?</ResultBox>
      <p>
        As a user I want to be able to join an existing game or create a new one
      </p>
    </StoryContainer>
  );
};