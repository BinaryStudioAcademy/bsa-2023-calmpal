import { type Service } from '#libs/types/types.js';
import { UserEntity } from '#packages/users/user.entity.js';
import { type UserRepository } from '#packages/users/user.repository.js';

import {
  type UserGetAllResponseDto,
  type UserSignInResponseDto,
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
    const item = await this.userRepository.create(
      UserEntity.initializeNew({
        email: payload.email,
        fullName: payload.fullName,
        passwordSalt: 'SALT', // TODO
        passwordHash: 'HASH', // TODO
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

  public async findByEmail(
    email: string,
  ): Promise<UserSignInResponseDto | null> {
    const userEntity = await this.userRepository.findByEmail(email);

    return userEntity ? userEntity.toObject() : null;
  }

  public async findById(id: number): Promise<UserSignInResponseDto | null> {
    const userEntity = await this.userRepository.findById(id);

    return userEntity ? userEntity.toObject() : null;
  }
}

export { UserService };
