import { ServerErrorType } from '#libs/enums/enums.js';
import { type UserNotFoundError } from '#libs/exceptions/exceptions.js';
import { HTTPCode } from '#libs/packages/http/http.js';

import { type ErrorInfo } from '../../types/types.js';

const getUserNotFoundErrorInfo = (error: UserNotFoundError): ErrorInfo => {
  const { message } = error;
  const status = HTTPCode.NOT_FOUND;

  return {
    status,
    internalMessage: `[Auth Error]: ${status} — ${message}`,
    response: {
      message,
      errorType: ServerErrorType.AUTHORIZATION,
    },
  };
};

export { getUserNotFoundErrorInfo };
