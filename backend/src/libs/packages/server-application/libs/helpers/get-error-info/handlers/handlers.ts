import { type ErrorHandler } from '../types/error-handler.type.js';
import { handleAuthErrorResponse } from './handle-auth-error-response.js';
import { handleHttpErrorResponse } from './handle-http-error-response.js';
import { handleValidationErrorResponse } from './handle-validation-error-response.js';

const errorHandlers: ErrorHandler[] = [
  handleAuthErrorResponse,
  handleHttpErrorResponse,
  handleValidationErrorResponse,
];

export { errorHandlers };
export { handleDefaultErrorResponse } from './handle-default-error-response.js';
