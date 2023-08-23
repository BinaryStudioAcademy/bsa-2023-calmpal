import {
  errorHandlers,
  handleDefaultErrorResponse,
} from './handlers/handlers.js';
import { type ErrorParameter, type ErrorResponse } from './types/types.js';

const createErrorResponse = (error: ErrorParameter): ErrorResponse => {
  const handler =
    errorHandlers.find((handler) => handler(error)) ??
    handleDefaultErrorResponse;

  return handler(error) as ErrorResponse;
};

export { createErrorResponse };
