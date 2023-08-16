import { type HTTP } from './libs/interfaces/interfaces.js';
import { type HTTPOptions } from './libs/types/types.js';

class BaseHttp implements HTTP {
  public load(path: string, options: HTTPOptions): Promise<Response> {
    const { method, payload, headers } = options;

    return fetch(path, {
      method,
      headers,
      body: payload,
    });
  }
}

export { BaseHttp };
