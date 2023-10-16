import { ServerErrorType } from '~/libs/enums/enums.js';
import { type AuthError } from '~/libs/exceptions/exceptions.js';

import { type ErrorInfo } from '../../types/types.js';

const getAuthErrorInfo = (error: AuthError): ErrorInfo => {
  const { message, status } = error;

  return {
    status,
    internalMessage: `[Auth Error]: ${status} — ${message}`,
    response: {
      message,
      errorType: ServerErrorType.AUTHORIZATION,
    },
  };
};

export { getAuthErrorInfo };
