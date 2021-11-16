import React, { useEffect, useState } from 'react';
import { UserModel } from '~/models/UserModel';
import useWebSocket from '../hooks/web-socket/useWebSocket';
import {
  Button,
  ButtonContainer,
  FormContainer,
  Input,
  Label,
} from '../../styling/landing-styles';
import { Message } from '../hooks/web-socket/types';
import { CreateData } from './types';
import { LandingEvent } from './EventConstants';

export const CreateGame = (props: { name: string }) => {
  const { name } = props;
  const [story, setStory] = useState('');
  const socket = useWebSocket();

  useEffect(() => { }, [name])

  const handleClick = () => {
    const data: CreateData = {
      name: name,
      story: story,
      event: LandingEvent.CREATE
    }

    const message: Message = {
      event: "story-event-listener",
      data: data
    }

    socket.send(message);
  };

  return (
    <FormContainer>
      <Label htmlFor="story-name">Story Name</Label>
      <Input
        type="text"
        id="story-name"
        name="story-name"
        onChange={(e: any) => setStory(e.target.value)}
      />
      <ButtonContainer>
        <Button create onClick={handleClick}>CREATE GAME</Button>
      </ButtonContainer>
    </FormContainer>
  );
};
