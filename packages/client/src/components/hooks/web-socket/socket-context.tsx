import React from 'react';
import { SocketService } from '~/components/hooks/web-socket/socket-service';

type Action = { type: 'create'; data } | { type: 'join'; data };
type Dispatch = (action: Action) => void;
type State = { socket: SocketService };

const SocketContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

const socketReducer = (state: State, action: Action) => {
  return state;
};

const SocketProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(socketReducer, {
    socket: new SocketService(),
  });
  const value = { state, dispatch };
  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

const useSocket = () => {
  const context = React.useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketContext');
  }
  return context;
};

export { SocketProvider, useSocket };
