import { ServerErrorType } from '#libs/enums/enums.js';
import { type HTTPCode, HTTPError } from '#libs/packages/http/http.js';
import { type ValueOf } from '#libs/types/types.js';

import { type ErrorHandler } from '../types/types.js';

const handleHttpErrorResponse: ErrorHandler = (error) => {
  if (error instanceof HTTPError) {
    const { message } = error;
    const status = error.status as ValueOf<typeof HTTPCode>;

    return {
      info: `[HTTP Error]: ${status} — ${message}`,
      status,
      response: {
        message,
        errorType: ServerErrorType.COMMON,
      },
    };
  }

  return null;
};

export { handleHttpErrorResponse };
