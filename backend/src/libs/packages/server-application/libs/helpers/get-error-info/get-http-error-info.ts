import { ServerErrorType } from '#libs/enums/enums.js';
import { type HTTPCode, type HTTPError } from '#libs/packages/http/http.js';
import { type ValueOf } from '#libs/types/types.js';

import { type ErrorHandler } from './types/types.js';

const getHTTPErrorInfo: ErrorHandler<HTTPError> = (error) => {
  const { message } = error;
  const status = error.status as ValueOf<typeof HTTPCode>;

  return {
    status,
    info: `[HTTP Error]: ${status} — ${message}`,
    response: {
      message,
      errorType: ServerErrorType.COMMON,
    },
  };
};

export { getHTTPErrorInfo };
