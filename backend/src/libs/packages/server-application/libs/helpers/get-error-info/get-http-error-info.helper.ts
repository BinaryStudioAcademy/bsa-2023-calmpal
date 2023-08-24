import { ServerErrorType } from '#libs/enums/enums.js';
import { type HTTPCode, type HTTPError } from '#libs/packages/http/http.js';
import { type ValueOf } from '#libs/types/types.js';

import { type ErrorInfo } from '../../types/types.js';

const getHttpErrorInfo = (error: HTTPError): ErrorInfo => {
  const { message } = error;
  const status = error.status as ValueOf<typeof HTTPCode>;

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
