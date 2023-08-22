import fp from 'fastify-plugin';

import { ExceptionMessage } from '#libs/enums/enums.js';
import { AuthError } from '#libs/exceptions/exceptions.js';
import { ControllerHook } from '#libs/packages/controller/controller.js';
import { HTTPCode, type HTTPMethod } from '#libs/packages/http/http.js';
import { checkIsWhiteRoute } from '#libs/packages/server-application/server-application.js';
import { type AuthTokenPayload, type JWTService } from '#packages/auth/auth.js';
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
        status: HTTPCode.UNAUTHORIZED,
      });
    }

    const { jwtService, userService } = services;
    const { userId } = await jwtService.decode<AuthTokenPayload>(token);
    const authorizedUser = await userService.findById(userId);

    if (!authorizedUser) {
      throw new AuthError({
        message: ExceptionMessage.INVALID_TOKEN,
        status: HTTPCode.UNAUTHORIZED,
      });
    }

    request.user = authorizedUser;
  });

  done();
});

export { authorization };
