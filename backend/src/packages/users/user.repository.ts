import { DatabaseTableName } from '#libs/packages/database/database.js';
import { CommonTableColumns } from '#libs/packages/database/libs/enums/enums.js';
import { type Repository } from '#libs/types/types.js';
import { UserEntity } from '#packages/users/user.entity.js';
import { type UserModel } from '#packages/users/user.model.js';

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

  public async findAll(): Promise<UserEntity[]> {
    const users = await this.userModel.query().execute();

    const userPromises = users.map(async (user) =>
      UserEntity.initialize(await this.getUserJoinWithUserDetails(user.id)),
    );
    return await Promise.all(userPromises);
  }

  private flattenUserJoinWithUserDetails(
    join: UserWithUserDetailsJoin,
  ): UserColumns {
    const newObject = { ...join };
    let fullName = '';
    if (newObject.details) {
      fullName = newObject.details.fullName;
    }
    delete newObject.details;
    return { ...newObject, fullName };
  }

  private async getUserJoinWithUserDetails(
    userId: number,
  ): Promise<UserColumns> {
    const join = await this.userModel
      .query()
      .withGraphJoined('details')
      .where(`${DatabaseTableName.USERS}.${CommonTableColumns.ID}`, '=', userId)
      .first()
      .castTo<UserWithUserDetailsJoin>();
    return this.flattenUserJoinWithUserDetails(join);
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
      .execute();
    return UserEntity.initialize(
      await this.getUserJoinWithUserDetails(user.id),
    );
  }

  public update(): ReturnType<Repository['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<Repository['delete']> {
    return Promise.resolve(true);
  }
}

export { UserRepository };
