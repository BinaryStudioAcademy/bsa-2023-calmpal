import { type HTTPCode } from '#libs/packages/http/http.js';
import { type ServerErrorResponse, type ValueOf } from '#libs/types/types.js';

type ErrorInfo = {
  internalMessage: string;
  status: ValueOf<typeof HTTPCode>;
  response: ServerErrorResponse;
};

export { type ErrorInfo };
