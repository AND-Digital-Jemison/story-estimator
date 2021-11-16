import React, { useEffect, useState } from 'react';
import { Socket } from '../hooks/web-socket/types';
import useWebSocket from '../hooks/web-socket/useWebSocket';
import {
  Button,
  FormContainer,
  Input,
  Label,
  PathContainer,
} from '../../styling/landing-styles';

export const JoinGame = () => {
  const [joinGameData, setJoinGameData] = useState({
    name: '',
    roomCode: '',
  });

  const socket = useWebSocket();

  const handleClick = () => {
    socket.send(joinGameData);
  };

  return (
    <FormContainer>
      <Label htmlFor="user-name">Name</Label>
      <Input
        type="text"
        id="user-name"
        name="user-name"
        value={joinGameData.name}
        onChange={event =>
          setJoinGameData({ ...joinGameData, name: event.target.value })
        }
      />

      <Label htmlFor="room-code">Room code</Label>
      <PathContainer>
        <Input
          roomcode
          type="text"
          id="room-code"
          name="room-code"
          onChange={event =>
            setJoinGameData({
              ...joinGameData,
              roomCode: event.target.value,
            })
          }
        />
        <Button onClick={handleClick}>JOIN</Button>
      </PathContainer>
    </FormContainer>
  );
};
