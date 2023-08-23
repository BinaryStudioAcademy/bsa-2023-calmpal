import { config } from '#libs/packages/config/config.js';
import { JWTService } from '#packages/auth/jwt.service.js';

const jwtService = new JWTService({
  secret: config.ENV.JWT.SECRET_KEY,
  alg: config.ENV.JWT.ALG,
});

export { jwtService };
