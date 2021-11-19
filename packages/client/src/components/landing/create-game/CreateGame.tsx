import React, { useState } from 'react';
import useWebSocket from '../../hooks/web-socket/useWebSocket';
import {
  CreateButton,
  ButtonContainer,
  FormContainer,
  Input,
  Label,
} from '../landing-styles';
import { Message } from '../../hooks/web-socket/types';
import { CreateData } from '../types';
import { LandingEvent } from '../event-constants';

export const CreateGame = (props: { name: string, validateNameCallback: (nameValid: boolean) => void }) => {
  const { name, validateNameCallback } = props;
  const [story, setStory] = useState('');
  const socket = useWebSocket();

  const handleClick = (e: any) => {
    e.preventDefault();
    const data: CreateData = {
      name: name,
      story: story,
      event: LandingEvent.CREATE
    }

    if (inputValid(data)) {
      const message: Message = {
        event: "story-event-listener",
        data: data
      }

      socket.send(message);
    }
  };

  const inputValid = (data: CreateData): boolean => {
    if (data.name.length === 0) {
      validateNameCallback(false);
      return false;
    }

    return true;
  }

  return (
    <FormContainer>
      <Label htmlFor="story-title">Story Title</Label>
      <Input
        type="text"
        id="story-title"
        name="story-title"
        onChange={(e: any) => setStory(e.target.value)}
      />
      <ButtonContainer>
        <CreateButton onClick={(e: any) => handleClick(e)}>CREATE GAME</CreateButton>
      </ButtonContainer>
    </FormContainer>
  );
};
