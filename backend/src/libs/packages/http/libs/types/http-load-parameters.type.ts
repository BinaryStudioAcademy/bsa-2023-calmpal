import { type HTTPMethod } from './types.js';

type HTTPLoadParameters = {
  method: HTTPMethod;
  url: string;
  data?: unknown;
  token?: string;
};

export { type HTTPLoadParameters };
