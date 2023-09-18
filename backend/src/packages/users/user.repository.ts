import { type Repository } from '#libs/types/types.js';
import { UserEntity } from '#packages/users/user.entity.js';
import { type UserModel } from '#packages/users/users.js';

import { UsersRelation } from './libs/enums/enums.js';
import {
  type UserCommonQueryResponse,
  type UserCreateQueryPayload,
  type UserWithPasswordQueryResponse,
} from './libs/types/types.js';
import { UserWithPasswordEntity } from './user-with-password.entity.js';

class UserRepository implements Repository {
  private userModel: typeof UserModel;

  public constructor(userModel: typeof UserModel) {
    this.userModel = userModel;
  }

  public find(): ReturnType<Repository['find']> {
    return Promise.resolve(null);
  }

  public async findById(id: number): Promise<UserEntity | null> {
    const user = await this.userModel
      .query()
      .modify('withoutPassword')
      .withGraphJoined(UsersRelation.DETAILS)
      .findById(id)
      .castTo<UserCommonQueryResponse | undefined>()
      .execute();

    if (!user) {
      return null;
    }

    return UserEntity.initialize({
      id: user.id,
      email: user.email,
      createdAt: new Date(user.createdAt),
      updatedAt: new Date(user.updatedAt),
      fullName: user.details?.fullName ?? '',
      isSurveyCompleted: user.details?.isSurveyCompleted ?? false,
    });
  }

  public async findAll(): Promise<UserWithPasswordEntity[]> {
    const users = await this.userModel
      .query()
      .select()
      .withGraphJoined(UsersRelation.DETAILS)
      .castTo<UserWithPasswordQueryResponse[]>()
      .execute();

    return users.map((user) => {
      return UserWithPasswordEntity.initialize({
        id: user.id,
        email: user.email,
        passwordHash: user.passwordHash,
        passwordSalt: user.passwordSalt,
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt),
        fullName: user.details?.fullName ?? '',
        isSurveyCompleted: user.details?.isSurveyCompleted ?? false,
      });
    });
  }

  public async create(entity: UserWithPasswordEntity): Promise<UserEntity> {
    const { email, passwordSalt, passwordHash, fullName, isSurveyCompleted } =
      entity.toNewObject();

    const user = await this.userModel
      .query()
      .insertGraph({
        email,
        passwordSalt,
        passwordHash,
        [UsersRelation.DETAILS]: {
          fullName,
          isSurveyCompleted,
        },
      } as UserCreateQueryPayload)
      .withGraphJoined(UsersRelation.DETAILS)
      .castTo<UserWithPasswordQueryResponse>()
      .execute();

    return UserEntity.initialize({
      id: user.id,
      email: user.email,
      createdAt: new Date(user.createdAt),
      updatedAt: new Date(user.updatedAt),
      fullName: user.details?.fullName ?? '',
      isSurveyCompleted: user.details?.isSurveyCompleted ?? false,
    });
  }

  public async updateIsSurveyCompleted(id: number): Promise<void> {
    await this.userModel
      .relatedQuery(UsersRelation.DETAILS)
      .for(id)
      .patch({ isSurveyCompleted: true });
  }

  public update(): ReturnType<Repository['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<Repository['delete']> {
    const deletedId = 0;

    return Promise.resolve(deletedId);
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.userModel
      .query()
      .modify('withoutPassword')
      .withGraphJoined(UsersRelation.DETAILS)
      .findOne({ email })
      .castTo<UserCommonQueryResponse | undefined>();

    if (!user) {
      return null;
    }

    return UserEntity.initialize({
      id: user.id,
      email: user.email,
      createdAt: new Date(user.createdAt),
      updatedAt: new Date(user.updatedAt),
      fullName: user.details?.fullName ?? '',
      isSurveyCompleted: user.details?.isSurveyCompleted ?? false,
    });
  }

  public async findByEmailWithPassword(
    email: string,
  ): Promise<UserWithPasswordEntity | null> {
    const user = await this.userModel
      .query()
      .withGraphJoined(UsersRelation.DETAILS)
      .findOne({ email })
      .castTo<UserWithPasswordQueryResponse | undefined>();
    if (!user) {
      return null;
    }

    return UserWithPasswordEntity.initialize({
      id: user.id,
      email: user.email,
      passwordHash: user.passwordHash,
      passwordSalt: user.passwordSalt,
      createdAt: new Date(user.createdAt),
      updatedAt: new Date(user.updatedAt),
      fullName: user.details?.fullName ?? '',
      isSurveyCompleted: user.details?.isSurveyCompleted ?? false,
    });
  }
}

export { UserRepository };
