import { HTTPCode } from '#index.js';
import { type ValueOf } from '#libs/types/types.js';

import { HTTPError } from '../http-error/http-error.exception.js';

type Constructor = {
  message?: string;
  status?: ValueOf<typeof HTTPCode>;
  cause?: unknown;
};

class ChatError extends HTTPError {
  public constructor({
    message = 'Chat error occurred.',
    cause,
    status = HTTPCode.INTERNAL_SERVER_ERROR,
  }: Constructor) {
    super({ message, status, cause });
  }
}

export { ChatError };
