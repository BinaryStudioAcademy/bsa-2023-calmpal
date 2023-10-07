import { ServerErrorType } from '#libs/enums/enums.js';
import { type UserError } from '#packages/users/users.js';

import { type ErrorInfo } from '../../types/types.js';

const getUsersErrorInfo = (error: UserError): ErrorInfo => {
  const { message } = error;
  const status = error.status;

  return {
    status,
    internalMessage: `[Users Error]: ${status} — ${message}`,
    response: {
      message,
      errorType: ServerErrorType.USERS,
    },
  };
};

export { getUsersErrorInfo };
