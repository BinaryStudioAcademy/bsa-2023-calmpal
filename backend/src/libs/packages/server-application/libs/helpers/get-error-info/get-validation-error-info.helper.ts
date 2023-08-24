import { ServerErrorType } from '#libs/enums/enums.js';
import { type ValidationError } from '#libs/exceptions/exceptions.js';
import { HTTPCode } from '#libs/packages/http/http.js';

import { type ErrorInfo } from '../../types/types.js';

const getValidationErrorInfo = (error: ValidationError): ErrorInfo => {
  const { message, details } = error;

  return {
    internalMessage: `[Validation Error]: ${message}`,
    status: HTTPCode.UNPROCESSED_ENTITY,
    response: {
      message,
      errorType: ServerErrorType.VALIDATION,
      details: details.map((detail) => ({
        path: detail.path,
        message: detail.message,
      })),
    },
  };
};

export { getValidationErrorInfo };
