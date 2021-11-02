import React from 'react'
import { render, screen } from "@testing-library/react"
import { Landing } from "./Landing"

describe('Landing page', () => {
    it('should render the page fields', () => {
        render(<Landing />);

        const nameLabel = screen.getByText('Name:');

        expect(nameLabel).toBeTruthy();
    })

    describe('When trying to create a new game', () => {
        it('should route to a new game with a corresponding title when the user\'s name is entered and the create button is clicked', () => {

        })

        it('should route to a new game when the user\'s name is entered and the create button is clicked', () => {

        })

        it('should show an error if the user attempts to create a game without typing their name', () => {

        })
    })

    describe('When joining a game', () => {
        it('should show an error if the user attempts to join a game without using a room code', () => {

        })

        it('should show an error if the user attempts to join a game an invalid room code', () => {

        })

        it('should route to a game if the user adds their name and a valid code and clicks Join', () => {

        })
    })
})