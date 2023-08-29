import { config } from '#libs/packages/config/config.js';
import { encrypt as encryptService } from '#libs/packages/encrypt/encrypt.js';
import { jwtService } from '#libs/packages/jwt/jwt.js';

import { UserModel } from './user.model.js';
import { UserRepository } from './user.repository.js';
import { UserService } from './user.service.js';

const userRepository = new UserRepository(UserModel);
const userService = new UserService({
  userRepository,
  jwtService,
  encryptService,
  config,
});

export { userService };
export {
  type UserAuthResponseDto,
  type UserSignInRequestDto,
  type UserSignInResponseDto,
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
} from './libs/types/types.js';
export {
  userSignInValidationSchema,
  userSignUpValidationSchema,
} from './libs/validation-schemas/validation-schemas.js';
export { UserModel } from './user.model.js';
export { type UserService } from './user.service.js';
