import 'fastify';

import { type UserSignUpResponseDto } from '#packages/users/users.js';

declare module 'fastify' {
  interface FastifyRequest {
    user: UserSignUpResponseDto | null;
  }
}
