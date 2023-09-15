import { type HTTPMethod } from './types.js';

type HTTPLoadParameters = {
  method: HTTPMethod;
  url: string;
  data?: object;
  token?: string;
};

export { type HTTPLoadParameters };
