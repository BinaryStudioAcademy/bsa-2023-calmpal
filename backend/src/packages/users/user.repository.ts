import { type UserRoleKey } from '~/libs/packages/open-ai/libs/enums/enums.js';
import { type Repository, type ValueOf } from '~/libs/types/types.js';
import { UserEntity } from '~/packages/users/user.entity.js';
import { type UserModel } from '~/packages/users/users.js';

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

  public async findById(id: number): Promise<UserEntity | null> {
    const user = await this.userModel
      .query()
      .modify('withoutPassword')
      .withGraphJoined(UsersRelation.DETAILS_WITH_SUBSCRIPTION)
      .whereNull('deletedAt')
      .findById(id)
      .castTo<UserCommonQueryResponse | undefined>();

    if (!user) {
      return null;
    }

    const subscriptionEndDate = user.details?.subscription?.endDate
      ? new Date(user.details.subscription.endDate)
      : null;

    return UserEntity.initialize({
      id: user.id,
      email: user.email,
      createdAt: new Date(user.createdAt),
      updatedAt: new Date(user.updatedAt),
      fullName: user.details?.fullName ?? '',
      isSurveyCompleted: user.details?.isSurveyCompleted ?? false,
      subscriptionId: user.details?.subscriptionId ?? null,
      subscriptionEndDate,
      deletedAt: user.deletedAt ? new Date(user.deletedAt) : null,
    });
  }

  public async findByRoleKey(
    key: ValueOf<typeof UserRoleKey>,
  ): Promise<UserEntity | null> {
    const user = await this.userModel
      .query()
      .modify('withoutPassword')
      .withGraphJoined(UsersRelation.DETAILS_WITH_SUBSCRIPTION)
      .whereNull('deletedAt')
      .withGraphJoined(UsersRelation.ROLES)
      .findOne({ key })
      .castTo<UserCommonQueryResponse | undefined>();

    if (!user) {
      return null;
    }

    const subscriptionEndDate = user.details?.subscription?.endDate
      ? new Date(user.details.subscription.endDate)
      : null;

    return UserEntity.initialize({
      id: user.id,
      email: user.email,
      createdAt: new Date(user.createdAt),
      updatedAt: new Date(user.updatedAt),
      fullName: user.details?.fullName ?? '',
      isSurveyCompleted: user.details?.isSurveyCompleted ?? false,
      deletedAt: user.deletedAt ? new Date(user.deletedAt) : null,
      subscriptionId: user.details?.subscriptionId ?? null,
      subscriptionEndDate,
    });
  }

  public findAll(): ReturnType<Repository['findAll']> {
    return Promise.resolve([]);
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
      .withGraphJoined(UsersRelation.DETAILS_WITH_SUBSCRIPTION)
      .castTo<UserWithPasswordQueryResponse>();

    const subscriptionEndDate = user.details?.subscription?.endDate
      ? new Date(user.details.subscription.endDate)
      : null;

    return UserEntity.initialize({
      id: user.id,
      email: user.email,
      createdAt: new Date(user.createdAt),
      updatedAt: new Date(user.updatedAt),
      fullName: user.details?.fullName ?? '',
      isSurveyCompleted: user.details?.isSurveyCompleted ?? false,
      deletedAt: user.deletedAt ? new Date(user.deletedAt) : null,
      subscriptionId: user.details?.subscriptionId ?? null,
      subscriptionEndDate,
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

  public async delete(id: number): Promise<number> {
    return await this.userModel
      .query()
      .patch({ deletedAt: new Date().toISOString() })
      .where({ id, deletedAt: null });
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.userModel
      .query()
      .modify('withoutPassword')
      .withGraphJoined(UsersRelation.DETAILS_WITH_SUBSCRIPTION)
      .findOne({ email })
      .castTo<UserCommonQueryResponse | undefined>();

    if (!user) {
      return null;
    }

    const subscriptionEndDate = user.details?.subscription?.endDate
      ? new Date(user.details.subscription.endDate)
      : null;

    return UserEntity.initialize({
      id: user.id,
      email: user.email,
      createdAt: new Date(user.createdAt),
      updatedAt: new Date(user.updatedAt),
      fullName: user.details?.fullName ?? '',
      isSurveyCompleted: user.details?.isSurveyCompleted ?? false,
      deletedAt: user.deletedAt ? new Date(user.deletedAt) : null,
      subscriptionId: user.details?.subscriptionId ?? null,
      subscriptionEndDate,
    });
  }

  public async findByEmailWithPassword(
    email: string,
  ): Promise<UserWithPasswordEntity | null> {
    const user = await this.userModel
      .query()
      .withGraphJoined(UsersRelation.DETAILS_WITH_SUBSCRIPTION)
      .whereNull('deletedAt')
      .findOne({ email })
      .castTo<UserWithPasswordQueryResponse | undefined>();

    if (!user) {
      return null;
    }

    const subscriptionEndDate = user.details?.subscription?.endDate
      ? new Date(user.details.subscription.endDate)
      : null;

    return UserWithPasswordEntity.initialize({
      id: user.id,
      email: user.email,
      passwordHash: user.passwordHash,
      passwordSalt: user.passwordSalt,
      createdAt: new Date(user.createdAt),
      updatedAt: new Date(user.updatedAt),
      fullName: user.details?.fullName ?? '',
      deletedAt: user.deletedAt ? new Date(user.deletedAt) : null,
      isSurveyCompleted: user.details?.isSurveyCompleted ?? false,
      subscriptionId: user.details?.subscriptionId ?? null,
      subscriptionEndDate,
    });
  }

  public async updateSubscription({
    id,
    subscriptionId,
  }: {
    id: number;
    subscriptionId: number;
  }): Promise<UserEntity> {
    await this.userModel
      .relatedQuery(UsersRelation.DETAILS)
      .for(id)
      .patch({ subscriptionId });

    const user = await this.userModel
      .query()
      .withGraphJoined(UsersRelation.DETAILS_WITH_SUBSCRIPTION)
      .findById(id)
      .castTo<UserCommonQueryResponse>();

    const subscriptionEndDate = user.details?.subscription?.endDate
      ? new Date(user.details.subscription.endDate)
      : null;

    return UserEntity.initialize({
      id: user.id,
      email: user.email,
      createdAt: new Date(user.createdAt),
      updatedAt: new Date(user.updatedAt),
      fullName: user.details?.fullName ?? '',
      isSurveyCompleted: user.details?.isSurveyCompleted ?? false,
      deletedAt: user.deletedAt ? new Date(user.deletedAt) : null,
      subscriptionId: user.details?.subscriptionId ?? null,
      subscriptionEndDate,
    });
  }
}

export { UserRepository };
