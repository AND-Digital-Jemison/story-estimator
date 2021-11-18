import React, { useState } from 'react';
import { CreateGame } from './create-game/CreateGame';
import { JoinGame } from './join-game/JoinGame';
import {
  Body,
  Container,
  Main,
  Title,
  FormContainer,
  Input,
  Label
} from './landing-styles';

export const Landing = () => {
  const [name, setName] = useState('');

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
              onChange={e => setName(e.currentTarget.value)
              }
            />
          </FormContainer>
          <JoinGame name={name} />
          <p>OR</p>
          <CreateGame name={name} />
        </Container>
      </Main>
    </Body>
  );
};
