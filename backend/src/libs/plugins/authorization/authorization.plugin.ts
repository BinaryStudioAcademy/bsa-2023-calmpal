import fp from 'fastify-plugin';

import { ExceptionMessage } from '#libs/enums/enums.js';
import { AuthError } from '#libs/exceptions/exceptions.js';
import { ControllerHook } from '#libs/packages/controller/controller.js';
import { type HTTPMethod } from '#libs/packages/http/http.js';
import { type JWTService } from '#libs/packages/jwt/jwt.service.js';
import { checkIsWhiteRoute } from '#libs/packages/server-application/server-application.js';
import { type AuthTokenPayload } from '#packages/auth/auth.js';
import { type UserService } from '#packages/users/users.js';

type Options = {
  services: {
    userService: UserService;
    jwtService: JWTService;
  };
};

const authorization = fp<Options>((fastify, { services }, done) => {
  fastify.decorateRequest('user', null);

  fastify.addHook(ControllerHook.ON_REQUEST, async (request) => {
    if (
      checkIsWhiteRoute({
        path: request.routerPath,
        method: request.method as HTTPMethod,
      })
    ) {
      return;
    }

    const [, token] = request.headers.authorization?.split(' ') ?? [];

    if (!token) {
      throw new AuthError({
        message: ExceptionMessage.UNAUTHORIZED_USER,
      });
    }

    const { jwtService, userService } = services;
    const { userId } = await jwtService.decode<AuthTokenPayload>(token);
    const authorizedUser = await userService.findById(userId);

    if (!authorizedUser) {
      throw new AuthError({
        message: ExceptionMessage.INVALID_TOKEN,
      });
    }

    request.user = authorizedUser;
  });

  done();
});

export { authorization };
