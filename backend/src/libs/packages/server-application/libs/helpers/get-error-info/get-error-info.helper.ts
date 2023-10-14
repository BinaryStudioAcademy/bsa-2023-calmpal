import { AuthError } from '~/libs/exceptions/exceptions.js';
import { HTTPError } from '~/libs/packages/http/http.js';
import { ChatError } from '~/packages/chats/chats.js';
import { FileError } from '~/packages/files/files.js';
import { UserError } from '~/packages/users/users.js';

import { type APIError, type ErrorInfo } from '../../types/types.js';
import { getAuthErrorInfo } from './get-auth-error-info.helper.js';
import { getChatErrorInfo } from './get-chat-error-info.helper.js';
import { getDefaultErrorInfo } from './get-default-error-info.helper.js';
import { getFileErrorInfo } from './get-file-error-info.helper.js';
import { getHttpErrorInfo } from './get-http-error-info.helper.js';
import { getUsersErrorInfo } from './get-users-error-info.helper.js';
import { getValidationErrorInfo } from './get-validation-error-info.helper.js';

const getErrorInfo = (error: APIError): ErrorInfo => {
  if ('isJoi' in error) {
    return getValidationErrorInfo(error);
  }

  if (error instanceof UserError) {
    return getUsersErrorInfo(error);
  }

  if (error instanceof FileError) {
    return getFileErrorInfo(error);
  }

  if (error instanceof AuthError) {
    return getAuthErrorInfo(error);
  }

  if (error instanceof ChatError) {
    return getChatErrorInfo(error);
  }

  if (error instanceof HTTPError) {
    return getHttpErrorInfo(error);
  }

  return getDefaultErrorInfo(error);
};

export { getErrorInfo };
