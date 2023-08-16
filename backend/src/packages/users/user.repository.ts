import { type Repository } from '#libs/interfaces/interfaces.js';
import { UserEntity } from '#packages/users/user.entity.js';
import { type UserModel } from '#packages/users/user.model.js';

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

    return users.map((item) => UserEntity.initialize(item));
  }

  public async create(entity: UserEntity): Promise<UserEntity> {
    const { email, passwordSalt, passwordHash } = entity.toNewObject();

    const item = await this.userModel
      .query()
      .insert({
        email,
        passwordSalt,
        passwordHash,
      })
      .returning('*')
      .execute();

    return UserEntity.initialize(item);
  }

  public update(): ReturnType<Repository['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<Repository['delete']> {
    return Promise.resolve(true);
  }
}

export { UserRepository };
