import React from 'react';
import { PointBox, StoryContainer } from './game-styles';

export const Story = () => {
  return (
    <StoryContainer>
      <PointBox>?</PointBox>
      <p>
        As a user I want to be able to join an existing game or create a new one
      </p>
    </StoryContainer>
  );
};