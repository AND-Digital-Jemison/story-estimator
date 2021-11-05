import WS from 'jest-websocket-mock';

export const mockSocketUrl = 'ws://localhost:8000';
export const mockSocketServer = new WS(mockSocketUrl);
