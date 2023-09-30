import { UserEntity } from './user.entity.js';

class UserWithPasswordEntity extends UserEntity {
  private passwordHash: string;

  private passwordSalt: string;

  private constructor({
    passwordHash,
    passwordSalt,
    ...baseData
  }: {
    id: number | null;
    email: string;
    fullName: string;
    passwordHash: string;
    passwordSalt: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    isSurveyCompleted: boolean;
    subscriptionId: number | null;
    subscriptionEndDate: Date | null;
    deletedAt: Date | null;
  }) {
    super(baseData);
    this.passwordHash = passwordHash;
    this.passwordSalt = passwordSalt;
  }

  public static initialize({
    passwordHash,
    passwordSalt,
    ...baseData
  }: {
    id: number | null;
    email: string;
    fullName: string;
    passwordHash: string;
    passwordSalt: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    isSurveyCompleted: boolean;
    subscriptionId: number | null;
    subscriptionEndDate: Date | null;
    deletedAt: Date | null;
  }): UserWithPasswordEntity {
    return new UserWithPasswordEntity({
      ...baseData,
      passwordHash,
      passwordSalt,
    });
  }

  public static initializeNew({
    passwordHash,
    passwordSalt,
    ...baseData
  }: {
    email: string;
    fullName: string;
    passwordHash: string;
    passwordSalt: string;
    isSurveyCompleted: boolean;
  }): UserWithPasswordEntity {
    return new UserWithPasswordEntity({
      ...baseData,
      id: null,
      passwordHash,
      passwordSalt,
      createdAt: null,
      updatedAt: null,
      subscriptionId: null,
      subscriptionEndDate: null,
      deletedAt: null,
    });
  }

  public toObject(): {
    id: number;
    email: string;
    fullName: string;
    createdAt: Date;
    updatedAt: Date;
    passwordHash: string;
    passwordSalt: string;
    isSurveyCompleted: boolean;
    subscriptionId: number | null;
    subscriptionEndDate: Date | null;
    deletedAt: Date | null;
  } {
    const baseObject = super.toObject();

    return {
      ...baseObject,
      passwordHash: this.passwordHash,
      passwordSalt: this.passwordSalt,
    };
  }

  public toNewObject(): {
    email: string;
    fullName: string;
    passwordHash: string;
    passwordSalt: string;
    isSurveyCompleted: boolean;
  } {
    const baseObject = super.toNewObject();

    return {
      ...baseObject,
      passwordHash: this.passwordHash,
      passwordSalt: this.passwordSalt,
    };
  }
}

export { UserWithPasswordEntity };
