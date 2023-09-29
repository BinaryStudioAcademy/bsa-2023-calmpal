import { config } from '#libs/packages/config/config.js';
import { encrypt as encryptService } from '#libs/packages/encrypt/encrypt.js';
import { jwtService } from '#libs/packages/jwt/jwt.js';
import { logger } from '#libs/packages/logger/logger.js';

import { UserController } from './user.controller.js';
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
const userController = new UserController(logger, userService);

export { userController, userService };
export {
  UserDetailsTableColumn,
  UsersTableColumn,
} from './libs/enums/enums.js';
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
export { UserEntity } from './user.entity.js';
export { UserModel } from './user.model.js';
export { type UserService } from './user.service.js';
export { UserDetailsModel } from './user-details.model.js';
