import { type ContentType, ServerErrorType } from '~/libs/enums/enums.js';
import { configureString } from '~/libs/helpers/helpers.js';
import {
  type HTTP,
  type HTTPCode,
  HTTPHeader,
} from '~/libs/packages/http/http.js';
import { HTTPError } from '~/libs/packages/http/http.js';
import { type ServerErrorResponse, type ValueOf } from '~/libs/types/types.js';

import { type HTTPApi, type HTTPApiOptions } from './libs/types/types.js';

type Constructor = {
  baseUrl: string;
  path: string;
  http: HTTP;
};

class BaseHttpApi implements HTTPApi {
  private baseUrl: string;

  private path: string;

  private http: HTTP;

  public constructor({ baseUrl, path, http }: Constructor) {
    this.baseUrl = baseUrl;
    this.path = path;
    this.http = http;
  }

  public async load<T>(path: string, options: HTTPApiOptions): Promise<T> {
    const { method, contentType, payload = null, token } = options;

    const headers = this.getHeaders(contentType, token);
    const response = await this.http.load(path, {
      method,
      headers,
      payload,
    });

    await this.checkResponse(response);

    return (await response.json()) as T;
  }

  protected getFullEndpoint<T extends Record<string, string>>(
    ...parameters: [...string[], T]
  ): string {
    const copiedParameters = [...parameters];

    const options = copiedParameters.pop() as T;

    return configureString(
      this.baseUrl,
      this.path,
      ...(copiedParameters as string[]),
      options,
    );
  }

  private getHeaders(
    contentType: ValueOf<typeof ContentType> | undefined,
    token: string | undefined,
  ): Headers {
    const headers = new Headers();

    if (contentType) {
      headers.append(HTTPHeader.CONTENT_TYPE, contentType);
    }

    if (token) {
      headers.append(HTTPHeader.AUTHORIZATION, `Bearer ${token}`);
    }

    return headers;
  }

  private async checkResponse(response: Response): Promise<Response> {
    if (!response.ok) {
      await this.handleError(response);
    }

    return response;
  }

  private async handleError(response: Response): Promise<never> {
    let parsedException: ServerErrorResponse;

    try {
      parsedException = (await response.json()) as ServerErrorResponse;
    } catch {
      parsedException = {
        errorType: ServerErrorType.COMMON,
        message: response.statusText,
      };
    }

    throw new HTTPError({
      status: response.status as ValueOf<typeof HTTPCode>,
      message: parsedException.message,
    });
  }
}

export { BaseHttpApi };
