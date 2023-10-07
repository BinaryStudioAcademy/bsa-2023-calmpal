import { type HTTPCode, HTTPError } from '#libs/packages/http/http.js';
import { type ValueOf } from '#libs/types/types.js';

type Constructor = {
  message: string;
  status: ValueOf<typeof HTTPCode>;
  cause?: unknown;
};

class UserError extends HTTPError {
  public constructor({ message, cause, status }: Constructor) {
    super({
      message,
      cause,
      status,
    });
  }
}

export { UserError };
