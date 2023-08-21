import { verifyToken } from '#packages/auth/libs/helpers/helpers.js';
import {
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
} from '#packages/users/libs/types/types.js';
import { type UserService } from '#packages/users/user.service.js';

class AuthService {
  private userService: UserService;

  public constructor(userService: UserService) {
    this.userService = userService;
  }

  public signUp(
    userRequestDto: UserSignUpRequestDto,
  ): Promise<UserSignUpResponseDto> {
    return this.userService.create(userRequestDto);
  }

  public async verifyToken(token: string): Promise<{ id: number }> {
    const { payload } = await verifyToken(token);

    return { id: payload.user_id };
  }
}

export { AuthService };
