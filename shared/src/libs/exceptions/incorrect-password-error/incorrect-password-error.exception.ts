import { HTTPCode } from '#libs/packages/http/http.js';
import { type ValueOf } from '#libs/types/value-of.type.js';

import { AuthError } from '../exceptions.js';

type Constructor = {
  message: string;
  status?: ValueOf<typeof HTTPCode>;
  cause?: unknown;
};

class IncorrectPasswordError extends AuthError {
  public constructor({
    message,
    cause,
    status = HTTPCode.INCORRECT_PASSWORD,
  }: Constructor) {
    super({ message, status, cause });
  }
}

export { IncorrectPasswordError };
