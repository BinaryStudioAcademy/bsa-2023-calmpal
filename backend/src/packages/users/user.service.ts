import { type JWTService } from '#libs/packages/jwt/jwt.service.js';
import { type Service } from '#libs/types/types.js';
import { UserEntity } from '#packages/users/user.entity.js';
import { type UserRepository } from '#packages/users/user.repository.js';

import {
  type UserAuthResponseDto,
  type UserGetAllResponseDto,
  type UserSignUpResponseDto,
} from './libs/types/types.js';

type UserServiceDependencies = {
  userRepository: UserRepository;
  jwtService: JWTService;
};

class UserService implements Service {
  private userRepository: UserRepository;
  private jwtService: JWTService;

  public constructor({ userRepository, jwtService }: UserServiceDependencies) {
    this.userRepository = userRepository;
    this.jwtService = jwtService;
  }

  public find(): ReturnType<Service['find']> {
    return Promise.resolve(null);
  }

  public async findAll(): Promise<UserGetAllResponseDto> {
    const items = await this.userRepository.findAll();

    return {
      items: items.map((item) => item.toObject()),
    };
  }

  public async create(
    payload: UserAuthResponseDto,
  ): Promise<UserSignUpResponseDto> {
    const item = await this.userRepository.create(
      UserEntity.initializeNew({
        email: payload.email,
        passwordSalt: 'SALT', // TODO
        passwordHash: 'HASH', // TODO
      }),
    );

    const user = item.toObject();
    const token = await this.jwtService.signJWT({ userId: user.id });

    return {
      user,
      token,
    };
  }

  public update(): ReturnType<Service['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<Service['delete']> {
    return Promise.resolve(true);
  }
}

export { UserService };
