import { HTTPCode } from '#libs/packages/http/http.js';
import { type ValueOf } from '#libs/types/value-of.type.js';

import { HTTPError } from '../http-error/http-error.exception.js';

type Constructor = {
  message: string;
  status?: ValueOf<typeof HTTPCode>;
  cause?: unknown;
};

class FileError extends HTTPError {
  public constructor({
    message,
    cause,
    status = HTTPCode.INTERNAL_SERVER_ERROR,
  }: Constructor) {
    super({ message, status, cause });
  }
}

export { FileError };
