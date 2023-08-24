import { type Repository } from '#libs/types/types.js';
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

  public async findById(id: number): Promise<UserEntity | null> {
    const user = await this.userModel.query().findById(id);

    if (!user) {
      return null;
    }

    return UserEntity.initialize(user);
  }

  public async findAll(): Promise<UserEntity[]> {
    const users = await this.userModel.query().execute();

    return users.map((user) => UserEntity.initialize(user));
  }

  public async create(entity: UserEntity): Promise<UserEntity> {
    const { email, passwordSalt, passwordHash } = entity.toNewObject();

    const user = await this.userModel
      .query()
      .insert({
        email,
        passwordSalt,
        passwordHash,
      })
      .returning('*')
      .execute();

    return UserEntity.initialize(user);
  }

  public async updateIsSurveyCompleted(id: number): Promise<void> {
    await this.userModel
      .query()
      .updateAndFetchById(id, { isSurveyCompleted: true })
      .execute();
  }

  public update(): ReturnType<Repository['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<Repository['delete']> {
    return Promise.resolve(true);
  }
}

export { UserRepository };
