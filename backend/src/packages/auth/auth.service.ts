import {
  type UserAuthResponseDto,
  type UserSignUpResponseDto,
} from '#packages/users/libs/types/types.js';
import { type UserService } from '#packages/users/user.service.js';

class AuthService {
  private userService: UserService;

  public constructor(userService: UserService) {
    this.userService = userService;
  }

  public signUp(
    userRequestDto: UserAuthResponseDto,
  ): Promise<UserSignUpResponseDto> {
    return this.userService.create(userRequestDto);
  }
}

export { AuthService };
