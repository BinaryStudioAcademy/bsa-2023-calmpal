import { mapTwoObjectsIntoOne } from '#libs/helpers/map-two-object-into-one.helper.js';
import { type Repository } from '#libs/types/types.js';
import { UserEntity } from '#packages/users/user.entity.js';
import { type UserModel } from '#packages/users/user.model.js';

import { type UserDetailsModel } from './user-details.model.js';

class UserRepository implements Repository {
  private userModel: typeof UserModel;
  private userDetailsModel: typeof UserDetailsModel;

  public constructor(userModel: typeof UserModel,
    userDetailsModel: typeof UserDetailsModel) {
    this.userModel = userModel;
    this.userDetailsModel = userDetailsModel;
  }

  public find(): ReturnType<Repository['find']> {
    return Promise.resolve(null);
  }

  public async findAll(): Promise<UserEntity[]> {
    const users = await this.userModel.query().execute();

    return users.map((user) => UserEntity.initialize({ ...user, fullName:'FullName' }));
  }

  public async create(entity: UserEntity): Promise<UserEntity> {
    const { email, passwordSalt, passwordHash, fullName } = entity.toNewObject();

    const user = await this.userModel
      .query()
      .insert({
        email,
        passwordSalt,
        passwordHash
      })
      .returning('*')
      .execute();
      const user_details = await this.userDetailsModel
      .query()
      .insert({
        fullName
      }).returning('*')
      .execute();
     
      await user_details.$relatedQuery('user').relate(user);

    return UserEntity.initialize(mapTwoObjectsIntoOne(user, user_details));
  }

  public update(): ReturnType<Repository['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<Repository['delete']> {
    return Promise.resolve(true);
  }
}

export { UserRepository };
