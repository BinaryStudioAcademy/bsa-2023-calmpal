import { type ErrorInfo } from './error-info.type.js';
import { type ErrorParameter } from './error-parameter.type.js';

type ErrorHandler<T extends ErrorParameter> = (error: T) => ErrorInfo;

export { type ErrorHandler };
