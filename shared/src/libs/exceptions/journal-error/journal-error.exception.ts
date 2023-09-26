import { HTTPCode } from '#libs/packages/http/http.js';
import { type ValueOf } from '#libs/types/types.js';

import { HTTPError } from '../http-error/http-error.exception.js';

type Constructor = {
  message: string;
  status?: ValueOf<typeof HTTPCode>;
  cause?: unknown;
};

class JournalError extends HTTPError {
  public constructor({
    message,
    cause,
    status = HTTPCode.NOT_FOUND,
  }: Constructor) {
    super({ message, status, cause });
  }
}

export { JournalError };
