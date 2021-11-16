import React, { useImperativeHandle } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { mockSocketServer } from '../../utils/mock-web-socket';
import { CreateGame } from './CreateGame';

describe('When clicking the CREATE button', () => {
  it("should send the user's information to the server", async () => {
    const mockCreateData = { name: 'testName' };

    render(<CreateGame />);

    await mockSocketServer.connected;

    const nameText = screen.getByLabelText('Name:');
    const createBtn = screen.getByText('CREATE');

    fireEvent.change(nameText, { target: { value: mockCreateData.name } });
    fireEvent.click(createBtn);

    await expect(mockSocketServer).toReceiveMessage(JSON.stringify(mockCreateData));
  });

  it("should route to a new game when the user's name is entered and the create button is clicked", () => { });

  it('should show an error if the user attempts to create a game without typing their name', () => { });
});
