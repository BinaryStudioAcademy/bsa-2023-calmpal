import { ServerErrorType } from '#libs/enums/enums.js';
import { type AuthError } from '#libs/exceptions/exceptions.js';
import { HTTPCode } from '#libs/packages/http/http.js';

import { type ErrorInfo } from '../../types/types.js';

const getAuthErrorInfo = (error: AuthError): ErrorInfo => {
  const { message } = error;
  const status = HTTPCode.UNAUTHORIZED;

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
