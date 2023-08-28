import { UserEntity } from './user.entity.js';

class UserWithPasswordEntity extends UserEntity {
  private passwordHash: string;

  private passwordSalt: string;

  private constructor({
    id,
    email,
    fullName,
    passwordHash,
    passwordSalt,
    createdAt,
    updatedAt,
    isSurveyCompleted,
  }: {
    id: number | null;
    email: string;
    fullName: string;
    passwordHash: string;
    passwordSalt: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    isSurveyCompleted: boolean;
  }) {
    super({
      id,
      email,
      fullName,
      createdAt,
      updatedAt,
      isSurveyCompleted,
    });
    this.passwordHash = passwordHash;
    this.passwordSalt = passwordSalt;
  }

  public getPasswordInfo(): {
    passwordHash: string;
    passwordSalt: string;
  } {
    return {
      passwordHash: this.passwordHash,
      passwordSalt: this.passwordSalt,
    };
  }

  public static initializeWithPassword({
    id,
    email,
    fullName,
    passwordHash,
    passwordSalt,
    createdAt,
    updatedAt,
    isSurveyCompleted,
  }: {
    id: number;
    email: string;
    fullName: string;
    passwordHash: string;
    passwordSalt: string;
    createdAt: Date;
    updatedAt: Date;
    isSurveyCompleted: boolean;
  }): UserWithPasswordEntity {
    return new UserWithPasswordEntity({
      id,
      email,
      fullName,
      passwordHash,
      passwordSalt,
      createdAt,
      updatedAt,
      isSurveyCompleted,
    });
  }

  public static initializeNewWithPassword({
    email,
    fullName,
    passwordHash,
    passwordSalt,
    isSurveyCompleted,
  }: {
    email: string;
    fullName: string;
    passwordHash: string;
    passwordSalt: string;
    isSurveyCompleted: boolean;
  }): UserWithPasswordEntity {
    return new UserWithPasswordEntity({
      id: null,
      email,
      fullName,
      passwordHash,
      passwordSalt,
      createdAt: null,
      updatedAt: null,
      isSurveyCompleted,
    });
  }

  public toObjectWithPassword(): {
    id: number;
    email: string;
    fullName: string;
    createdAt: Date;
    updatedAt: Date;
    passwordHash: string;
    passwordSalt: string;
    isSurveyCompleted: boolean;
  } {
    const baseObject = super.toObject();

    return {
      ...baseObject,
      passwordHash: this.passwordHash,
      passwordSalt: this.passwordSalt,
    };
  }

  public toNewObjectWithPassword(): {
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
