import { AuthError, UsersError } from '#libs/exceptions/exceptions.js';
import { HTTPError } from '#libs/packages/http/http.js';

import { type APIError, type ErrorInfo } from '../../types/types.js';
import { getAuthErrorInfo } from './get-auth-error-info.helper.js';
import { getDefaultErrorInfo } from './get-default-error-info.helper.js';
import { getHttpErrorInfo } from './get-http-error-info.helper.js';
import { getUsersErrorInfo } from './get-users-error-info.helper.js';
import { getValidationErrorInfo } from './get-validation-error-info.helper.js';

const getErrorInfo = (error: APIError): ErrorInfo => {
  if ('isJoi' in error) {
    return getValidationErrorInfo(error);
  }

  if (error instanceof UsersError) {
    return getUsersErrorInfo(error);
  }

  if (error instanceof AuthError) {
    return getAuthErrorInfo(error);
  }

  if (error instanceof HTTPError) {
    return getHttpErrorInfo(error);
  }

  return getDefaultErrorInfo(error);
};

export { getErrorInfo };
