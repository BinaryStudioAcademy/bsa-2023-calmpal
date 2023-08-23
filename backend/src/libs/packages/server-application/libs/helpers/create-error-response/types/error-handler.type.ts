import { type ErrorParameter } from './error-parameter.type.js';
import { type ErrorResponse } from './error-response.type.js';

type ErrorHandler = (error: ErrorParameter) => ErrorResponse | null;

export { type ErrorHandler };
