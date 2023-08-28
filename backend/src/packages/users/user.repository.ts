import { type Repository } from '#libs/types/types.js';
import { UserEntity } from '#packages/users/user.entity.js';
import { type UserModel } from '#packages/users/user.model.js';

import { UsersRelation } from './libs/enums/enums.js';
import {
  type UserCommonQueryResponse,
  type UserCreateQueryPayload,
} from './libs/types/types.js';

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
      passwordHash: user.passwordHash,
      passwordSalt: user.passwordSalt,
      createdAt: new Date(user.createdAt),
      updatedAt: new Date(user.updatedAt),
      fullName: user.details?.fullName ?? '',
      isSurveyCompleted: user.details?.isSurveyCompleted ?? false,
    });
  }

  public async findAll(): Promise<UserEntity[]> {
    const users = await this.userModel
      .query()
      .select()
      .withGraphJoined(UsersRelation.DETAILS)
      .castTo<UserCommonQueryResponse[]>()
      .execute();

    return users.map((user) => {
      return UserEntity.initialize({
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

  public async create(entity: UserEntity): Promise<UserEntity> {
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
      .castTo<UserCommonQueryResponse>()
      .execute();

    return UserEntity.initialize({
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

  public async updateIsSurveyCompleted(entity: UserEntity): Promise<void> {
    const { id, isSurveyCompleted } = entity.toObject();

    await this.userModel
      .relatedQuery(UsersRelation.DETAILS)
      .for(id)
      .patch({ isSurveyCompleted });
  }

  public update(): ReturnType<Repository['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<Repository['delete']> {
    return Promise.resolve(true);
  }
}

export { UserRepository };
