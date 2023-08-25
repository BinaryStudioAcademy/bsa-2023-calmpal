import { type UserAuthResponseDto } from '#packages/users/users.js';

type DefaultApiHandlerOptions = {
  body?: unknown;
  query?: unknown;
  params?: unknown;
  user?: UserAuthResponseDto | null;
};

type APIHandlerOptions<
  T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
  body: T['body'];
  query: T['query'];
  params: T['params'];
  user: T['user'];
};

export { type APIHandlerOptions };
