import { config } from '#libs/packages/config/config.js';
import { logger } from '#libs/packages/logger/logger.js';
import { userService } from '#packages/users/users.js';

import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { JWTService } from './jwt.service.js';

const jwtService = new JWTService({
  secret: config.ENV.JWT.SECRET_KEY,
  alg: config.ENV.JWT.ALG,
});
const authService = new AuthService(userService);
const authController = new AuthController(logger, authService);

export { authController, authService, jwtService };
