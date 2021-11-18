import React from 'react';
import { render, screen } from '@testing-library/react';
import { Landing } from './Landing';

describe('Landing page', () => {
  it('should render the page fields', () => {
    render(<Landing />);

    const nameLabel = screen.getByText('Name');
    const roomCodeLabel = screen.getByText('Room Code');
    const joinButton = screen.getByText('JOIN');
    const createButton = screen.getByText('CREATE GAME');

    expect(nameLabel).toBeTruthy();
    expect(roomCodeLabel).toBeTruthy();
    expect(createButton).toBeTruthy();
    expect(joinButton).toBeTruthy();
  });
});
