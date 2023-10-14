import { ServerErrorType } from '~/libs/enums/enums.js';
import { type HTTPError } from '~/libs/packages/http/http.js';

import { type ErrorInfo } from '../../types/types.js';

const getHttpErrorInfo = (error: HTTPError): ErrorInfo => {
  const { message, status } = error;

  return {
    status,
    internalMessage: `[HTTP Error]: ${status} — ${message}`,
    response: {
      message,
      errorType: ServerErrorType.COMMON,
    },
  };
};

export { getHttpErrorInfo };
