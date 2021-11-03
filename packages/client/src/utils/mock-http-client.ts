import axios from 'axios'
import { HttpClientService } from './http-client.service'

const mockedAxios = axios as jest.Mocked<typeof axios>
const mockHttpClient = new HttpClientService(mockedAxios);

export default mockHttpClient;