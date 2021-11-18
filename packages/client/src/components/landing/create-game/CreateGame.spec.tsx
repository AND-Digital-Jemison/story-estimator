import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { mockSocketServer } from '../../../utils/mock-web-socket';
import { CreateGame } from './CreateGame';
import { Message } from '~/components/hooks/web-socket/types';
import { LandingEvent } from '../event-constants';

describe('When clicking the CREATE button', () => {
  it("should send the user's information to the server", async () => {
    const mockCreateData: Message = {
      event: 'story-event-listener',
      data: {
        name: 'testName',
        story: 'testStory',
        event: LandingEvent.CREATE
      }
    };

    render(<CreateGame name={'testName'} />);

    await mockSocketServer.connected;

    const storyText = screen.getByLabelText('Story Title');
    const createBtn = screen.getByText('CREATE GAME');

    fireEvent.change(storyText, { target: { value: mockCreateData.data.story } });
    fireEvent.click(createBtn);

    await expect(mockSocketServer).toReceiveMessage(JSON.stringify(mockCreateData));
  });

  it("should route to a new game when the user's name is entered and the create button is clicked", () => { });

  it('should show an error if the user attempts to create a game without typing their name', () => { });
});
