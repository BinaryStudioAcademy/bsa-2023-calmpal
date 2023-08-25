import { encrypt } from '#libs/packages/encrypt/encrypt.js';
import {
  type UserSignInRequestDto,
  type UserSignInResponseDto,
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

  public async verifyLoginCredentials({
    email,
    password, // password, --> should be used for password comparison
  }: UserSignInRequestDto): Promise<UserSignInResponseDto | null> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      return null;
    }

    const pswrdCompare = await encrypt.compare(password, user.passwordHash);

    if (!pswrdCompare) {
      return null;
    }

    return user;
  }

  public async signIn(id: number): Promise<UserSignInResponseDto | null> {
    return await this.userService.findById(id);
  }
}

export { AuthService };
