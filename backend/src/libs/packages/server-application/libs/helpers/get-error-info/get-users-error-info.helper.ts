import { ServerErrorType } from '#libs/enums/enums.js';
import { type UsersError } from '#libs/exceptions/exceptions.js';

import { type ErrorInfo } from '../../types/types.js';

const getUsersErrorInfo = (error: UsersError): ErrorInfo => {
  const { message } = error;
  const status = error.status;

  return {
    status,
    internalMessage: `[Auth Error]: ${status} — ${message}`,
    response: {
      message,
      errorType: ServerErrorType.AUTHORIZATION,
    },
  };
};

export { getUsersErrorInfo };
