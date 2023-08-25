import { ServerErrorType } from '#libs/enums/enums.js';
import { type IncorrectPasswordError } from '#libs/exceptions/exceptions.js';
import { HTTPCode } from '#libs/packages/http/http.js';

import { type ErrorInfo } from '../../types/types.js';

const getIncorrectPasswordErrorInfo = (
  error: IncorrectPasswordError,
): ErrorInfo => {
  const { message } = error;
  const status = HTTPCode.INCORRECT_PASSWORD;

  return {
    status,
    internalMessage: `[Validation Error]: ${status} — ${message}`,
    response: {
      message,
      errorType: ServerErrorType.VALIDATION,
      details: [],
    },
  };
};

export { getIncorrectPasswordErrorInfo };
