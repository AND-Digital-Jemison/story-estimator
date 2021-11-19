import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Message } from '~/components/hooks/web-socket/types';
import { mockSocketServer } from '../../../utils/mock-web-socket';
import { LandingEvent } from '../event-constants';
import { JoinGame } from './JoinGame';

describe('When joining a game', () => {
  it('should send the user\'s information to the server', async () => {
    const mockJoinData: Message = {
      event: 'story-event-listener',
      data: {
        name: 'testName',
        roomCode: 'testCode',
        event: LandingEvent.JOIN
      }
    };

    render(<JoinGame name={'testName'} validateNameCallback={jest.fn()} />);

    await mockSocketServer.connected;

    const roomCode = screen.getByLabelText('Room Code');
    const joinBtn = screen.getByText('JOIN');

    fireEvent.change(roomCode, { target: { value: mockJoinData.data.roomCode } });
    fireEvent.click(joinBtn);

    await expect(mockSocketServer).toReceiveMessage(JSON.stringify(mockJoinData));
  });

  it('should show an error if the user attempts to join a game without using a room code', async () => {
    render(<JoinGame name={'testName'} validateNameCallback={jest.fn()} />);

    const joinBtn = screen.getByText('JOIN');

    fireEvent.click(joinBtn);

    expect(screen.getByText('Please enter a valid room code')).toBeTruthy();
  });

  it('should show an error if the user attempts to join a game with an invalid room code', () => { });

  it('should route to a game if the user adds their name and a valid code and clicks Join', () => { });
});
