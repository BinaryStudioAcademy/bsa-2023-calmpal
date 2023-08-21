import fp from 'fastify-plugin';

import { ExceptionMessage } from '#libs/enums/enums.js';
import { AuthError } from '#libs/exceptions/exceptions.js';
import { ControllerHook } from '#libs/packages/controller/controller.js';
import { type HTTPMethod } from '#libs/packages/http/http.js';
import { checkIsWhiteRoute } from '#libs/packages/server-application/server-application.js';
import { type AuthService } from '#packages/auth/auth.service.js';
import { type UserService } from '#packages/users/user.service.js';

type PluginOptions = {
  services: {
    userService: UserService;
    authService: AuthService;
  };
};

const authorization = fp<PluginOptions>((fastify, { services }, done) => {
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

    const { authService, userService } = services;
    const { id } = await authService.verifyToken(token);
    const authorizedUser = await userService.findById(id);

    if (!authorizedUser) {
      throw new AuthError({ message: ExceptionMessage.INVALID_TOKEN });
    }

    request.user = authorizedUser;
  });

  done();
});

export { authorization };
