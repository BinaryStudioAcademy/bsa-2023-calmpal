import { HTTPCode } from '#libs/packages/http/http.js';
import { type ValueOf } from '#libs/types/value-of.type.js';

import { HTTPError } from '../http-error/http-error.exception.js';

type Constructor = {
  message: string;
  status?: ValueOf<typeof HTTPCode>;
  cause?: unknown;
};

class AuthError extends HTTPError {
  public constructor({
    message,
    cause,
    status = HTTPCode.UNAUTHORIZED,
  }: Constructor) {
    super({ message, status, cause });
  }
}

export { AuthError };
