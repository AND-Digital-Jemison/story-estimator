import React, { useState } from 'react';
import { Message } from '../../hooks/web-socket/types';
import useWebSocket from '../../hooks/web-socket/useWebSocket';
import {
  Button,
  FormContainer,
  Input,
  JoinButton,
  Label,
  PathContainer,
} from '../landing-styles';
import { JoinData } from '../types';
import { LandingEvent } from '../event-constants';

export const JoinGame = (props: { name: string }) => {
  const { name } = props;
  const [roomCode, setRoomCode] = useState('');

  const socket = useWebSocket();

  const handleClick = () => {
    const data: JoinData = {
      name: name,
      roomCode: roomCode,
      event: LandingEvent.JOIN
    }

    const message: Message = {
      event: "story-event-listener",
      data: data
    }

    socket.send(message);
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
          onChange={e => setRoomCode(e.currentTarget.value)}
        />
        <JoinButton onClick={handleClick}>JOIN</JoinButton>
      </PathContainer>
    </FormContainer>
  );
};
