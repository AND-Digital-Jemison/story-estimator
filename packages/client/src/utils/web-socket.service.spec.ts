import axios from 'axios'
import { WebSocketService } from "./web-socket.service";

describe('When posting data to an endpoint', () => {
    it('should post successfully to an endpoint', async () => {
        const endpoint = 'endpoint';
        const postResponse = { success: true };
        const payload = {};

        const mockedAxios = axios as jest.Mocked<typeof axios>;
        mockedAxios.post = jest.fn().mockResolvedValue(postResponse);

        const mockHttp = new WebSocketService(mockedAxios)

        await mockHttp.postPromise(endpoint, payload);

        expect(mockedAxios.post).toHaveBeenCalledWith(endpoint, payload)
    })
})