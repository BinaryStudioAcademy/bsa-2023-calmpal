import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

import { ContentType } from '#libs/enums/enums.js';

import { type HTTPLoadMethod } from './libs/types/types.js';

class HTTPService {
  private _instance: AxiosInstance;

  public constructor() {
    this._instance = axios.create({
      timeout: 5000,
    });
  }

  public async load<T>({
    method,
    url,
    data,
    token,
  }: HTTPLoadMethod): Promise<T> {
    const axiosConfig: AxiosRequestConfig = {
      method,
      url,
      data,
      headers: {
        'Content-Type': ContentType.JSON,
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await this._instance.request<T>(axiosConfig);

    return response.data;
  }
}

export { HTTPService };
