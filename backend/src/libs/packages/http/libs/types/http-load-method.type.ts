import { type HTTPMethod } from './types.js';

type HTTPLoadMethod = {
  method: HTTPMethod;
  url: string;
  data?: object;
  token?: string;
};

export { type HTTPLoadMethod };
