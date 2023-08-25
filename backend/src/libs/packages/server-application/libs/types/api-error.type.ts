import { type FastifyError } from 'fastify';

import {
  type AuthError,
  type ValidationError,
} from '#libs/exceptions/exceptions.js';
import { type HTTPError } from '#libs/packages/http/http.js';

type APIError = FastifyError | ValidationError | HTTPError | AuthError;

export { type APIError };
