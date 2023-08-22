import { jwtVerify, type JWTVerifyResult } from 'jose';

import { config } from '#libs/packages/config/config.js';

const secret = new TextEncoder().encode(config.ENV.JWT.SECRET_KEY);

const verifyToken = async (token: string): Promise<JWTVerifyResult> =>
  await jwtVerify(token, secret);

export { verifyToken };
