import { HTTPCode, HTTPError } from '#libs/packages/http/http.js';
import { type ValueOf } from '#libs/types/types.js';

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
