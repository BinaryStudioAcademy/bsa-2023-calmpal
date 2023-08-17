import { type HTTPCode } from '#libs/packages/http/http.js';
import { type ValueOf } from '#libs/types/types.js';

type APIHandlerResponse = {
  status: ValueOf<typeof HTTPCode>;
  payload: unknown;
};

export { type APIHandlerResponse };
