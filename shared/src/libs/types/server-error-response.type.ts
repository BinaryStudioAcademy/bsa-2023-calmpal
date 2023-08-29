import { type ServerErrorType } from '#libs/enums/enums.js';

import { type ServerErrorDetail } from './server-error-detail.type.js';

type ServerValidationErrorResponse = {
  errorType: typeof ServerErrorType.VALIDATION;
  message: string;
  details: ServerErrorDetail[];
};

type ServerCommonErrorResponse = {
  errorType: typeof ServerErrorType.COMMON;
  message: string;
};

type ServerAuthErrorResponse = {
  errorType: typeof ServerErrorType.AUTHORIZATION;
  message: string;
};

type ServerUsersErrorResponse = {
  errorType: typeof ServerErrorType.USERS;
  message: string;
};

type ServerErrorResponse =
  | ServerValidationErrorResponse
  | ServerCommonErrorResponse
  | ServerAuthErrorResponse
  | ServerUsersErrorResponse;

export {
  type ServerAuthErrorResponse,
  type ServerCommonErrorResponse,
  type ServerErrorResponse,
  type ServerUsersErrorResponse,
  type ServerValidationErrorResponse,
};
