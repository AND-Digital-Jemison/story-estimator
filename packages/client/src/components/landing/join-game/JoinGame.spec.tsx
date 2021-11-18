import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Message } from '~/components/hooks/web-socket/types';
import { mockSocketServer } from '../../../utils/mock-web-socket';
import { LandingEvent } from '../event-constants';
import { JoinGame } from './JoinGame';

describe('When joining a game', () => {
  it("should send the user's information to the server", async () => {
    const mockJoinData: Message = {
      event: 'story-event-listener',
      data: {
        name: 'testName',
        roomCode: 'testCode',
        event: LandingEvent.JOIN
      }
    };

    render(<JoinGame name={'testName'} />);

    await mockSocketServer.connected;

    const roomCode = screen.getByLabelText('Room Code');
    const joinBtn = screen.getByText('JOIN');

    fireEvent.change(roomCode, { target: { value: mockJoinData.data.roomCode } });
    fireEvent.click(joinBtn);

    await expect(mockSocketServer).toReceiveMessage(JSON.stringify(mockJoinData));
  });

  it("should route to a new game when the user's name is entered and the create button is clicked", () => { });

  it('should show an error if the user attempts to create a game without typing their name', () => { });

  it('should show an error if the user attempts to join a game without using a room code', () => { });

  it('should show an error if the user attempts to join a game an invalid room code', () => { });

  it('should route to a game if the user adds their name and a valid code and clicks Join', () => { });
});
