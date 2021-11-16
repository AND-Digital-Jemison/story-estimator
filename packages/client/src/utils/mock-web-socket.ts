import WS from 'jest-websocket-mock';

export const mockSocketUrl = 'ws://localhost:8001';
export const mockSocketServer = new WS(mockSocketUrl);
