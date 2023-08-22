import bcrypt from 'bcrypt';

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

  public constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
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
    const passwordSalt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(payload.password, passwordSalt);
    const item = await this.userRepository.create(
      UserEntity.initializeNew({
        fullName: payload.fullName,
        email: payload.email,
        passwordSalt,
        passwordHash,
      }),
    );

    return item.toObject();
  }

  public update(): ReturnType<Service['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<Service['delete']> {
    return Promise.resolve(true);
  }
}

export { UserService };
