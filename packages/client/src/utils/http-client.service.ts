import {AxiosInstance} from "axios";

export class HttpClientService{
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

  private handleResponse() {

  }

  private handleError() {

  }

  private handleRequest() {

  }
};
