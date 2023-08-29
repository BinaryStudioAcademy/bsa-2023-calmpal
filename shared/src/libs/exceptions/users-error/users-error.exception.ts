import { type HTTPCode } from '#libs/packages/http/http.js';
import { type ValueOf } from '#libs/types/types.js';

import { ApplicationError } from '../exceptions.js';

type Constructor = {
  message: string;
  status: ValueOf<typeof HTTPCode>;
  cause?: unknown;
};

class UsersError extends ApplicationError {
  public status: ValueOf<typeof HTTPCode>;

  public constructor({ message, cause, status }: Constructor) {
    super({
      message,
      cause,
    });

    this.status = status;
  }
}

export { UsersError };
