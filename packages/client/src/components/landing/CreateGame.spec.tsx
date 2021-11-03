import { fireEvent, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import mockHttpClient from "~/utils/mock-web-socket";

describe('When trying to create a new game', () => {
  it("should route to a new game with a corresponding title when the user's name is entered and the create button is clicked", async () => {
    const promise = Promise.resolve();
    mockHttpClient.postPromise = jest.fn(() => {
      return promise.then(() => []);
    });

    const mockCreateData = { userName: 'testName', roundName: 'testRound' };
    const nameText = screen.getByRole('input', { name: 'name' })
    const roundText = screen.getByRole('input', { name: 'round-name' })
    const createBtn = screen.getByText('CREATE')

    fireEvent.change(nameText, { target: { value: 'testName' } })
    fireEvent.change(roundText, { target: { value: 'testRound' } })
    fireEvent.click(createBtn);

    await act(() => promise);

    expect(mockHttpClient.postPromise).toHaveBeenCalledWith(mockCreateData);
  });

  it("should route to a new game when the user's name is entered and the create button is clicked", () => { });

  it('should show an error if the user attempts to create a game without typing their name', () => { });
});
