import {fireEvent, screen} from "@testing-library/react";

describe('When trying to create a new game', () => {
  it("should route to a new game with a corresponding title when the user's name is entered and the create button is clicked", () => {
    const mockCreateData = {userName: 'testName', roundName: 'testRound'};
    const nameText = screen.getByRole('input',{name:'name'})
    const roundText = screen.getByRole('input',{name:'round-name'})
    const createBtn = screen.getByText('CREATE')
    // fire event to put mock data into text fields
    fireEvent.change(nameText, {target: {value:'testName'}})
    fireEvent.change(roundText, {target: {value:'testRound'}})
    fireEvent.click(createBtn);
    // ensure the updated text displays on the screen
    // expect(apiResult).toHaveBeenCalledWith(mockCreateData)
  });

  it("should route to a new game when the user's name is entered and the create button is clicked", () => {});

  it('should show an error if the user attempts to create a game without typing their name', () => {});
});
