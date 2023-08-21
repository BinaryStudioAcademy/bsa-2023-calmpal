import 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    // TODO: change mocked user to user data type
    user: { email: string; name: string } | null;
  }
}
