import { ServerErrorType } from '#libs/enums/enums.js';
import { type AWSError } from '#libs/exceptions/exceptions.js';
import { HTTPCode } from '#libs/packages/http/http.js';

import { type ErrorInfo } from '../../types/types.js';

const getAwsErrorInfo = (error: AWSError): ErrorInfo => {
  const { message } = error;
  const status = HTTPCode.BAD_REQUEST;

  return {
    status,
    internalMessage: `[AWS Error]: ${status} — ${message}`,
    response: {
      message,
      errorType: ServerErrorType.AWS,
    },
  };
};

export { getAwsErrorInfo };
