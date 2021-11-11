import React, { useEffect, useState } from 'react';
import { Socket } from '../hooks/web-socket/types';
import useWebSocket from '../hooks/web-socket/useWebSocket';
import {
  Button,
  ButtonContainer,
  FormContainer,
  Input,
  Label,
} from '../../styling/landing-styles';

export const CreateGame = () => {
  const [createGameData, setCreateGameData] = useState({
    name: '',
    storyName: '',
  });
  const socket = useWebSocket();

  const handleClick = () => {
    socket.send(createGameData);
  };

  return (
    <FormContainer>
      <Label htmlFor = "story-name">Story Name</Label>
      <Input
        type="text"
        id="story-name"
        name="story-name"
        onChange={event =>
          setCreateGameData({
            ...createGameData,
            storyName: event.target.value,
          })
        }
      />
      <ButtonContainer>
        <Button create onClick={handleClick}>CREATE GAME</Button>
      </ButtonContainer>
    </FormContainer>
  );
};
