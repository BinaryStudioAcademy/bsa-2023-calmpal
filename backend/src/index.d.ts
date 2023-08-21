import 'fastify';

import { type UserSignUpResponseDto } from '#packages/users/users.ts';

declare module 'fastify' {
  interface FastifyRequest {
    user: UserSignUpResponseDto | null;
  }
}

declare module 'jose' {
  interface JWTPayload {
    user_id: number;
  }
}
