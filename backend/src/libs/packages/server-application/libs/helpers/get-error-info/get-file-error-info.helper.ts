import { ServerErrorType } from '#libs/enums/enums.js';
import { HTTPCode } from '#libs/packages/http/http.js';
import { type FileError } from '#packages/files/files.js';

import { type ErrorInfo } from '../../types/types.js';

const getFileErrorInfo = (error: FileError): ErrorInfo => {
  const { message } = error;
  const status = HTTPCode.BAD_REQUEST;

  return {
    status,
    internalMessage: `[File Error]: ${status} — ${message}`,
    response: {
      message,
      errorType: ServerErrorType.FILE,
    },
  };
};

export { getFileErrorInfo };
