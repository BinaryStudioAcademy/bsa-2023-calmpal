import { type Entity } from '#libs/types/types.js';

class UserEntity implements Entity {
  private id: number | null;

  private createdAt: Date | null;

  private updatedAt: Date | null;

  private email: string;

  private fullName: string;

  private passwordHash: string;

  private passwordSalt: string;

  private isSurveyCompleted: boolean;

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
    this.id = id;
    this.email = email;
    this.fullName = fullName;
    this.passwordHash = passwordHash;
    this.passwordSalt = passwordSalt;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isSurveyCompleted = isSurveyCompleted;
  }

  public static initialize({
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
  }): UserEntity {
    return new UserEntity({
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

  public static initializeNew({
    email,
    fullName,
    passwordHash,
    passwordSalt,
    isSurveyCompleted = false,
  }: {
    email: string;
    fullName: string;
    passwordHash: string;
    passwordSalt: string;
    isSurveyCompleted: boolean;
  }): UserEntity {
    return new UserEntity({
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

  public toObject(): {
    id: number;
    email: string;
    fullName: string;
    createdAt: Date;
    updatedAt: Date;
    isSurveyCompleted: boolean;
  } {
    return {
      id: this.id as number,
      email: this.email,
      fullName: this.fullName,
      createdAt: this.createdAt as Date,
      updatedAt: this.updatedAt as Date,
      isSurveyCompleted: this.isSurveyCompleted,
    };
  }

  public toNewObject(): {
    email: string;
    fullName: string;
    passwordHash: string;
    passwordSalt: string;
    isSurveyCompleted: boolean;
  } {
    return {
      email: this.email,
      fullName: this.fullName,
      passwordHash: this.passwordHash,
      passwordSalt: this.passwordSalt,
      isSurveyCompleted: this.isSurveyCompleted,
    };
  }
}

export { UserEntity };
