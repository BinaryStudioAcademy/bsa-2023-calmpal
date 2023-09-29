import { ExceptionMessage } from '#libs/enums/enums.js';
import { AuthError, UsersError } from '#libs/exceptions/exceptions.js';
import { encrypt } from '#libs/packages/encrypt/encrypt.js';
import { HTTPCode } from '#libs/packages/http/http.js';
import { type JWTService } from '#libs/packages/jwt/jwt.js';
import {
  type UserAuthResponseDto,
  type UserSignInRequestDto,
  type UserSignInResponseDto,
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
} from '#packages/users/libs/types/types.js';
import { UserEntity } from '#packages/users/user.entity.js';
import { type UserService } from '#packages/users/user.service.js';

type Constructor = { userService: UserService; jwtService: JWTService };

class AuthService {
  private userService: UserService;

  private jwtService: JWTService;

  public constructor({ userService, jwtService }: Constructor) {
    this.userService = userService;
    this.jwtService = jwtService;
  }

  public async signUp(
    userRequestDto: UserSignUpRequestDto,
  ): Promise<UserSignUpResponseDto> {
    const { email } = userRequestDto;

    const user = await this.userService.findByEmail(email);
    if (!user) {
      return await this.userService.create(userRequestDto);
    }

    if (user.deletedAt) {
      throw new AuthError({
        message: ExceptionMessage.USER_WAS_DELETED,
        status: HTTPCode.BAD_REQUEST,
      });
    }

    throw new AuthError({
      message: ExceptionMessage.USER_ALREADY_EXISTS,
      status: HTTPCode.BAD_REQUEST,
    });
  }

  public async verifyLoginCredentials({
    email,
    password,
  }: UserSignInRequestDto): Promise<UserEntity> {
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

  public async signIn(userEntity: UserEntity): Promise<UserSignInResponseDto> {
    const user = userEntity.toObject();
    const token = await this.jwtService.signJWT({ userId: user.id });

    return {
      user,
      token,
    };
  }

  public async getAuthenticatedUser(id: number): Promise<UserAuthResponseDto> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new UsersError({
        status: HTTPCode.NOT_FOUND,
        message: ExceptionMessage.USER_NOT_FOUND,
      });
    }

    return user;
  }
}

export { AuthService };
