import { HTTPCode } from '#libs/packages/http/http.js';
import { type ValueOf } from '#libs/types/value-of.type.js';

import { HTTPError } from '../exceptions.js';

type Constructor = {
  message: string;
  status?: ValueOf<typeof HTTPCode>;
  cause?: unknown;
};

class UserNotFoundError extends HTTPError {
  public constructor({
    message,
    cause,
    status = HTTPCode.NOT_FOUND,
  }: Constructor) {
    super({ message, status, cause });
  }
}

export { UserNotFoundError };
