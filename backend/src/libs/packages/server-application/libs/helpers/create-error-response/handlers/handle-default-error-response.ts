import { ServerErrorType } from '#libs/enums/enums.js';
import { HTTPCode } from '#libs/packages/http/http.js';

import { type ErrorHandler } from '../types/types.js';

const handleDefaultErrorResponse: ErrorHandler = (error) => {
  return {
    info: error.message,
    status: HTTPCode.INTERNAL_SERVER_ERROR,
    response: {
      message: error.message,
      errorType: ServerErrorType.COMMON,
    },
  };
};

export { handleDefaultErrorResponse };
