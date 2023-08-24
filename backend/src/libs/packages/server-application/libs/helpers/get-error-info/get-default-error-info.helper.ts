import { ServerErrorType } from '#libs/enums/enums.js';
import { HTTPCode } from '#libs/packages/http/http.js';

import { type APIError, type ErrorInfo } from '../../types/types.js';

const getDefaultErrorInfo = (error: APIError): ErrorInfo => {
  return {
    internalMessage: error.message,
    status: HTTPCode.INTERNAL_SERVER_ERROR,
    response: {
      message: error.message,
      errorType: ServerErrorType.COMMON,
    },
  };
};

export { getDefaultErrorInfo };
