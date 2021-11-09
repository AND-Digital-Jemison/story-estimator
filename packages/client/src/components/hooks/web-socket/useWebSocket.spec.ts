import { act, renderHook } from '@testing-library/react-hooks';
import {
  mockSocketServer,
} from '../../../utils/mock-web-socket';
import useWebSocket from './useWebSocket';

describe('When sending data to a socket', () => {
  it('should be sent successfully', async () => {
    const mockData = { test: '123' };

    const { result } = renderHook(() => useWebSocket());
    await mockSocketServer.connected;

    act(() => result.current.send(mockData));

    await expect(mockSocketServer).toReceiveMessage(JSON.stringify(mockData));
    expect(mockSocketServer).toHaveReceivedMessages([JSON.stringify(mockData)]);

    mockSocketServer.close();
  });

  // it('should receive messages from the server', async () => {
  //   const mockResponse = { test: '123' };

  //   const { result } = renderHook(() => useWebSocket());
  //   await mockSocketServer.connected;

  //   act(() => result.current.connect());

  //   mockSocketServer.send(mockResponse);

  //   expect(result.current.response).toBe(mockResponse);
  // });
});
