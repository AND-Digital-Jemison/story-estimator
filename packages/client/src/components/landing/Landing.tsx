import React, { useState } from 'react';
import { CreateGame } from './create-game/CreateGame';
import { JoinGame } from './join-game/JoinGame';
import {
  Body,
  Container,
  FormContainer,
  Input,
  Label,
  Main,
  Title,
  ValidationLabel,
} from './landing-styles';

export const Landing = () => {
  const [name, setName] = useState('');
  const [nameValid, setNameValid] = useState(true);

  const validateName = (nameValid: boolean) => {
    setNameValid(nameValid);
  };

  return (
    <Body>
      <Main>
        <Title>Planning Poker</Title>
        <Container>
          <FormContainer>
            <Label htmlFor="user-name">Name</Label>
            <Input
              type="text"
              id="user-name"
              name="user-name"
              value={name}
              maxLength={30}
              onChange={e => setName(e.currentTarget.value)}
            />
            {!nameValid && (
              <ValidationLabel>Please enter a name</ValidationLabel>
            )}
          </FormContainer>
          <JoinGame name={name} validateNameCallback={validateName} />
          <p>OR</p>
          <CreateGame name={name} validateNameCallback={validateName} />
        </Container>
      </Main>
    </Body>
  );
};
