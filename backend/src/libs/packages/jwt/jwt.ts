import { config } from '#libs/packages/config/config.js';
import { JWTService } from '#libs/packages/jwt/jwt.service.js';

const jwtService = new JWTService({
  secret: config.ENV.JWT.SECRET_KEY,
  alg: config.ENV.JWT.ALG,
});

export { jwtService };
export { type JWTService } from '#libs/packages/jwt/jwt.service.js';
