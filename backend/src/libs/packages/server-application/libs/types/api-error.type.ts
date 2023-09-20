import { type FastifyError } from 'fastify';

import {
  type AuthError,
  type ChatError,
  type UsersError,
  type ValidationError,
} from '#libs/exceptions/exceptions.js';
import { type HTTPError } from '#libs/packages/http/http.js';

type APIError =
  | FastifyError
  | ValidationError
  | HTTPError
  | AuthError
  | ChatError
  | UsersError;

export { type APIError };
