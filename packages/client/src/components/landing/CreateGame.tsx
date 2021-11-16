import React, { useState } from 'react';
import { UserModel } from '~/models/UserModel';
import useWebSocket from '../hooks/web-socket/useWebSocket';
import {
  Button,
  ButtonContainer,
  FormContainer,
  Input,
  Label,
} from '../../styling/landing-styles';

export const CreateGame = () => {
  const [user, setUser] = useState<UserModel>();
  const socket = useWebSocket();

  const handleClick = () => {
    socket.send(user);
  };

  return (
    <FormContainer>
      <Label htmlFor="story-name">Story Name</Label>
      <Input
        type="text"
        id="story-name"
        name="story-name"
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
      <ButtonContainer>
        <Button create onClick={handleClick}>CREATE GAME</Button>
      </ButtonContainer>
    </FormContainer>
  );
};
