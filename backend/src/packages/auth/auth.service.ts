import { ExceptionMessage } from '#libs/enums/enums.js';
import { AuthError, UsersError } from '#libs/exceptions/exceptions.js';
import { encrypt } from '#libs/packages/encrypt/encrypt.js';
import { HTTPCode } from '#libs/packages/http/http.js';
import {
  type UserAuthResponseDto,
  type UserSignInRequestDto,
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
} from '#packages/users/libs/types/types.js';
import { UserEntity } from '#packages/users/user.entity.js';
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
    if (user) {
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
  }: UserSignInRequestDto): Promise<UserEntity | null> {
    const user = await this.userService.findByEmailWithPassword(email);

    if (!user) {
      throw new UsersError({
        status: HTTPCode.NOT_FOUND,
        message: ExceptionMessage.USER_NOT_FOUND,
      });
    }

    const isSamePassword = await encrypt.compare(password, user.passwordHash);

    if (!isSamePassword) {
      throw new AuthError({
        message: ExceptionMessage.INCORRECT_CREDENTIALS,
      });
    }

    return UserEntity.initialize(user);
  }

  public getAuthenticatedUser(id: number): Promise<UserAuthResponseDto | null> {
    return this.userService.findById(id);
  }
}

export { AuthService };
