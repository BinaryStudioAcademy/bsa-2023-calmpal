import { ExceptionMessage } from '#libs/enums/enums.js';
import { AuthError } from '#libs/exceptions/exceptions.js';
import { encrypt } from '#libs/packages/encrypt/encrypt.js';
import { HTTPCode } from '#libs/packages/http/http.js';
import {
  type UserAuthResponseDto,
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

  public async signUp(
    userRequestDto: UserSignUpRequestDto,
  ): Promise<UserSignUpResponseDto> {
    const { email } = userRequestDto;

    const user = await this.userService.findByEmail(email);
    if (user.id && user.email) {
      throw new AuthError({
        message: ExceptionMessage.USER_ALREADY_EXISTS,
        status: HTTPCode.BAD_REQUEST,
      });
    }

    return await this.userService.create(userRequestDto);
  }

  public async verifyLoginCredentials({
    email,
    password,
  }: UserSignInRequestDto): Promise<UserSignInResponseDto | null> {
    const user = await this.userService.findByEmail(email);
    const userWithPassword = await this.userService.getUserInfoWithPassword(
      email,
    );

    const isSamePassword = await encrypt.compare(
      password,
      userWithPassword.passwordHash,
    );

    if (!isSamePassword) {
      throw new AuthError({
        message: ExceptionMessage.INCORRECT_CREDENTIALS,
      });
    }

    return user;
  }

  public getAuthenticatedUser(id: number): Promise<UserAuthResponseDto | null> {
    return this.userService.findById(id);
  }
}

export { AuthService };
