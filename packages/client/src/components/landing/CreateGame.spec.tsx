import { fireEvent, render, screen } from "@testing-library/react";
import { mockSocketServer, mockSocketUrl } from "~/utils/mock-web-socket";
import { act } from "react-dom/test-utils";

describe('When clicking the CREATE button', () => {
  it('should send the user\'s information to the server and route to a new game', async () => {
    const mockCreateData = { userName: 'testName', roundName: 'testRound' };

    render(<CreateGame />);

    mockSocketServer.connected;

    const nameText = screen.getByRole('input', { name: 'name' })
    const roundText = screen.getByRole('input', { name: 'round-name' })
    const createBtn = screen.getByText('CREATE')

    fireEvent.change(nameText, { target: { value: mockCreateData.userName } })
    fireEvent.change(roundText, { target: { value: mockCreateData.roundName } })
    fireEvent.click(createBtn);

    await expect(mockSocketServer).toReceiveMessage(mockCreateData);
  });

  it("should route to a new game when the user's name is entered and the create button is clicked", () => { });

  it('should show an error if the user attempts to create a game without typing their name', () => { });
});
