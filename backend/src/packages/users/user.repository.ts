import { type Repository } from '#libs/types/types.js';
import { UserEntity } from '#packages/users/user.entity.js';
import { type UserModel } from '#packages/users/user.model.js';

import { UsersRelation } from './libs/enums/users-relation.enum.js';
import {
  type UserColumns,
  type UserInsertData,
  type UserWithUserDetailsJoin,
} from './libs/types/types.js';

class UserRepository implements Repository {
  private userModel: typeof UserModel;

  public constructor(userModel: typeof UserModel) {
    this.userModel = userModel;
  }

  public find(): ReturnType<Repository['find']> {
    return Promise.resolve(null);
  }

  private mapUserWithUserDetailsJoin(
    join: UserWithUserDetailsJoin,
  ): UserColumns {
    const joinCopy = { ...join };
    const fullName: string = joinCopy.details?.fullName as string;
    delete joinCopy.details;

    return { ...joinCopy, fullName };
  }

  public async findAll(): Promise<UserEntity[]> {
    const usersJoins = await this.userModel
      .query()
      .select()
      .withGraphJoined(UsersRelation.DETAILS)
      .castTo<UserWithUserDetailsJoin[]>()
      .execute();
    return usersJoins.map((usersJoin) => {
      return UserEntity.initialize(this.mapUserWithUserDetailsJoin(usersJoin));
    });
  }

  public async create(entity: UserEntity): Promise<UserEntity> {
    const { email, passwordSalt, passwordHash, fullName } =
      entity.toNewObject();
    const userData: UserInsertData = {
      email,
      passwordSalt,
      passwordHash,
      details: {
        fullName,
      },
    };
    const user = await this.userModel
      .query()
      .insertGraph(userData)
      .returning('*')
      .castTo<UserWithUserDetailsJoin>()
      .execute();
    return UserEntity.initialize(this.mapUserWithUserDetailsJoin(user));
  }

  public update(): ReturnType<Repository['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<Repository['delete']> {
    return Promise.resolve(true);
  }
}

export { UserRepository };
