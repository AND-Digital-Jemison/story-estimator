import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
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

  it('should validate the name field when the CREATE GAME button is clicked', () => {
    render(<Landing />);

    const createButton = screen.getByText('CREATE GAME');

    fireEvent.click(createButton);

    expect(screen.getByText('Please enter a name')).toBeTruthy();
  })

  it('should validate the name field when the JOIN button is clicked', () => {
    render(<Landing />);

    const joinButton = screen.getByText('JOIN');

    fireEvent.click(joinButton);

    expect(screen.getByText('Please enter a name')).toBeTruthy();
  })
});
