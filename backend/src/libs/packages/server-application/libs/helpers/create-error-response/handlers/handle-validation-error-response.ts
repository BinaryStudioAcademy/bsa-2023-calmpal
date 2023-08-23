import { ServerErrorType } from '#libs/enums/enums.js';
import { HTTPCode } from '#libs/packages/http/http.js';

import { type ErrorHandler } from '../types/types.js';

const handleValidationErrorResponse: ErrorHandler = (error) => {
  if ('isJoi' in error) {
    const { message, details } = error;

    return {
      info: `[Validation Error]: ${message}`,
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
  }

  return null;
};

export { handleValidationErrorResponse };
