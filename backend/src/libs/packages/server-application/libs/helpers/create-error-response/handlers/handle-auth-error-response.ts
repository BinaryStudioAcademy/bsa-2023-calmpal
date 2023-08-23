import { ServerErrorType } from '#libs/enums/enums.js';
import { AuthError } from '#libs/exceptions/exceptions.js';
import { HTTPCode } from '#libs/packages/http/http.js';

import { type ErrorHandler } from '../types/types.js';

const handleAuthErrorResponse: ErrorHandler = (error) => {
  if (error instanceof AuthError) {
    const { message } = error;
    const status = HTTPCode.UNAUTHORIZED;

    return {
      status,
      info: `[Auth Error]: ${status} — ${message}`,
      response: {
        message,
        errorType: ServerErrorType.AUTHORIZATION,
      },
    };
  }

  return null;
};

export { handleAuthErrorResponse };
