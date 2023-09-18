import { ContentType } from '#libs/enums/enums.js';
import { type ValueOf } from '#libs/types/types.js';

import {
  type HTTPCode,
  HTTPError,
  HTTPHeader,
  type HTTPLoadParameters,
} from './libs/types/types.js';

class HTTPService {
  public async load<T>({
    method,
    url,
    data,
    token,
  }: HTTPLoadParameters): Promise<T> {
    const headers = this.getHeaders(ContentType.JSON, token);

    const fetchConfig = {
      method,
      headers,
      body: data ? JSON.stringify(data) : null,
    };

    const response = await fetch(url, fetchConfig);

    if (!response.ok) {
      throw new HTTPError({
        message: await response.text(),
        status: response.status as ValueOf<typeof HTTPCode>,
      });
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
