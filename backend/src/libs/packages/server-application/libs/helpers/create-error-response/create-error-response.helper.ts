import { type FastifyError } from 'fastify';

import { ServerErrorType } from '#libs/enums/enums.js';
import {
  AuthError,
  type ValidationError,
} from '#libs/exceptions/exceptions.js';
import { HTTPCode, HTTPError } from '#libs/packages/http/http.js';
import { type ServerErrorResponse, type ValueOf } from '#libs/types/types.js';

type ErrorParameter = FastifyError | ValidationError | HTTPError;

type CreateErrorResponseReturn = {
  status: ValueOf<typeof HTTPCode>;
  response: ServerErrorResponse;
};

const createErrorResponse = (
  error: ErrorParameter,
): CreateErrorResponseReturn => {
  const { message } = error;
  let status: ValueOf<typeof HTTPCode> = HTTPCode.INTERNAL_SERVER_ERROR;
  let errorType: ValueOf<typeof ServerErrorType> = ServerErrorType.COMMON;
  let response: ServerErrorResponse;

  if (error instanceof AuthError) {
    status = HTTPCode.UNAUTHORIZED;
    errorType = ServerErrorType.AUTHORIZATION;
  }

  if (error instanceof HTTPError) {
    status = error.status as ValueOf<typeof HTTPCode>;
  }

  response = {
    errorType,
    message,
  };

  if ('isJoi' in error) {
    const { details } = error;
    status = HTTPCode.UNPROCESSED_ENTITY;
    errorType = ServerErrorType.VALIDATION;
    response = {
      errorType,
      message,
      details: details.map((detail) => ({
        path: detail.path,
        message: detail.message,
      })),
    };
  }

  return {
    status,
    response,
  };
};

export { createErrorResponse };
