import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Message } from '../../hooks/web-socket/types';
import {
  FormContainer,
  Input,
  JoinButton,
  Label,
  PathContainer,
  ValidationLabel,
} from '../landing-styles';
import { JoinData } from '../types';
import { LandingEvent } from '../event-constants';

export const JoinGame = (props: {
  name: string;
  validateNameCallback: (nameValid: boolean) => void;
}) => {
  const { name, validateNameCallback } = props;
  const [roomCode, setRoomCode] = useState('');
  const [roomCodeValid, setRoomCodeValid] = useState(true);
  const history = useHistory();

  const handleClick = (e: any) => {
    e.preventDefault();
    const data: JoinData = {
      name: name,
      gameId: roomCode,
      event: LandingEvent.JOIN,
    };

    if (inputValid(data)) {
      const message: Message = {
        event: 'story-event-listener',
        data: data,
      };

      history.push('/game', message);
    }
  };

  const inputValid = (data: JoinData): boolean => {
    let valid = true;
    if (data.name.length === 0) {
      validateNameCallback(false);
      valid = false;
    } else {
      validateNameCallback(true);
    }

    if (data.gameId.length === 0) {
      setRoomCodeValid(false);
      valid = false;
    } else {
      setRoomCodeValid(true);
    }

    return valid;
  };

  return (
    <FormContainer>
      <Label htmlFor="room-code">Room Code</Label>
      <PathContainer>
        <Input
          roomcode
          type="text"
          id="room-code"
          name="room-code"
          maxLength={6}
          onChange={e => setRoomCode(e.currentTarget.value)}
        />
        <JoinButton onClick={e => handleClick(e)}>JOIN</JoinButton>
      </PathContainer>
      {!roomCodeValid && (
        <ValidationLabel>Please enter a valid room code</ValidationLabel>
      )}
    </FormContainer>
  );
};
