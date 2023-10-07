import { type FastifyError } from 'fastify';

import {
  type AuthError,
  type ValidationError,
} from '#libs/exceptions/exceptions.js';
import { type HTTPError } from '#libs/packages/http/http.js';
import { type ChatError } from '#packages/chats/chats.js';
import { type JournalError } from '#packages/journal-entries/journal-entries.js';
import { type UserError } from '#packages/users/users.js';

type APIError =
  | FastifyError
  | ValidationError
  | HTTPError
  | AuthError
  | ChatError
  | JournalError
  | UserError;

export { type APIError };
