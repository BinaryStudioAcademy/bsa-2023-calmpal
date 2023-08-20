import { SignJWT } from 'jose';

import { type BaseConfig } from '#libs/packages/config/base-config.package.js';
import { type Service } from '#libs/types/types.js';
import { UserEntity } from '#packages/users/user.entity.js';
import { type UserRepository } from '#packages/users/user.repository.js';

import {
  type UserGetAllResponseDto,
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
} from './libs/types/types.js';

class UserService implements Service {
  private userRepository: UserRepository;
  private config: BaseConfig;

  public constructor(userRepository: UserRepository, config: BaseConfig) {
    this.userRepository = userRepository;
    this.config = config;
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
    payload: UserSignUpRequestDto,
  ): Promise<UserSignUpResponseDto> {
    const item = await this.userRepository.create(
      UserEntity.initializeNew({
        email: payload.email,
        passwordSalt: 'SALT', // TODO
        passwordHash: 'HASH', // TODO
      }),
    );

    const secret = Buffer.from(this.config.ENV.AUTH.JWT_SECRET, 'utf8');
    const userObject = item.toObject();
    const jwt = await new SignJWT({ user_id: userObject.id })
      .setProtectedHeader({ alg: 'HS256' })
      .sign(secret);

    return {
      ...item.toObject(),
      token: jwt,
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
