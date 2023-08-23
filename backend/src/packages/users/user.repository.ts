import { type Repository } from '#libs/types/types.js';
import { UserEntity } from '#packages/users/user.entity.js';
import { type UserModel } from '#packages/users/user.model.js';

import { type UserDetailsModel } from './user-details.model.js';
import { type UserInsertData } from './libs/types/types.js';

class UserRepository implements Repository {
  private userModel: typeof UserModel;
  private userDetailsModel: typeof UserDetailsModel;

  public constructor(
    userModel: typeof UserModel,
    userDetailsModel: typeof UserDetailsModel,
  ) {
    this.userModel = userModel;
    this.userDetailsModel = userDetailsModel;
  }

  public find(): ReturnType<Repository['find']> {
    return Promise.resolve(null);
  }

  public async findAll(): Promise<UserEntity[]> {
    const users = await this.userModel.query().execute();

    return users.map((user) =>
      UserEntity.initialize({ ...user, fullName: 'FullName' }),
    );
  }

  public async create(entity: UserEntity): Promise<UserEntity> {
    const { email, passwordSalt, passwordHash, fullName } =
      entity.toNewObject();
    const userData: UserInsertData = 
      {
        email,
        passwordSalt,
        passwordHash,
        details: {
          fullName
        }
      };

    const user = await this.userModel
      .query()
      .insertGraph(userData)
      .returning('*')
      .execute();

    return UserEntity.initialize(({ ...user, fullName}));
  }

  public update(): ReturnType<Repository['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<Repository['delete']> {
    return Promise.resolve(true);
  }
}

export { UserRepository };
