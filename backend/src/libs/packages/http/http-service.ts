import { ContentType } from '#libs/enums/enums.js';
import { type ValueOf } from '#libs/types/types.js';

import { HTTPHeader, type HTTPLoadMethod } from './libs/types/types.js';

class HTTPService {
  public async load<T>({
    method,
    url,
    data,
    token,
  }: HTTPLoadMethod): Promise<T> {
    const headers = this.getHeaders(ContentType.JSON, token);

    const fetchConfig = {
      method,
      headers,
      body: data ? JSON.stringify(data) : null,
    };

    const response = await fetch(url, fetchConfig);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return (await response.json()) as T;
  }

  private getHeaders(
    contentType: ValueOf<typeof ContentType>,
    token?: string,
  ): Headers {
    const headers = new Headers();

    headers.append(HTTPHeader.CONTENT_TYPE, contentType);

    if (token) {
      headers.append(HTTPHeader.AUTHORIZATION, `Bearer ${token}`);
    }

    return headers;
  }
}

export { HTTPService };
