import { AxiosError, AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";

export class HttpClientService {
  constructor(
    private axiosInstance: AxiosInstance
  ) {
    this.axiosInstance.interceptors.response.use(
      this.handleResponse,
      this.handleError
    );
    this.axiosInstance.interceptors.request.use(
      this.handleRequest,
      this.handleError
    );
  }

  public promiseErrorHandler = (error: any): typeof error => {
    return error;
  };

  public postPromise<T>(endpoint: string, data: any): Promise<any> {
    return this.axiosInstance
      .post(endpoint, data)
      .catch(this.promiseErrorHandler)
  }

  private handleResponse = ({ data }: AxiosResponse) => {
    return data;
  };

  private handleError = (error: AxiosError): any => {
    return Promise.reject(error);
  }

  private handleRequest = (config: AxiosRequestConfig) => {
    config.headers!.Accept = 'application/json';
    config.headers!.ContentType = 'application/json';

    return config;
  };
};
