import { type Entity } from '#libs/types/types.js';

class UserEntity implements Entity {
  private id: number | null;

  private email: string;

  private passwordHash: string;

  private passwordSalt: string;

  private isSurveyCompleted: boolean;

  private constructor({
    id,
    email,
    passwordHash,
    passwordSalt,
    isSurveyCompleted,
  }: {
    id: number | null;
    email: string;
    passwordHash: string;
    passwordSalt: string;
    isSurveyCompleted: boolean;
  }) {
    this.id = id;
    this.email = email;
    this.passwordHash = passwordHash;
    this.passwordSalt = passwordSalt;
    this.isSurveyCompleted = isSurveyCompleted;
  }

  public static initialize({
    id,
    email,
    passwordHash,
    passwordSalt,
    isSurveyCompleted,
  }: {
    id: number;
    email: string;
    passwordHash: string;
    passwordSalt: string;
    isSurveyCompleted: boolean;
  }): UserEntity {
    return new UserEntity({
      id,
      email,
      passwordHash,
      passwordSalt,
      isSurveyCompleted,
    });
  }

  public static initializeNew({
    email,
    passwordHash,
    passwordSalt,
    isSurveyCompleted = false,
  }: {
    email: string;
    passwordHash: string;
    passwordSalt: string;
    isSurveyCompleted: boolean;
  }): UserEntity {
    return new UserEntity({
      id: null,
      email,
      passwordHash,
      passwordSalt,
      isSurveyCompleted,
    });
  }

  public toObject(): {
    id: number;
    email: string;
    isSurveyCompleted: boolean;
  } {
    return {
      id: this.id as number,
      email: this.email,
      isSurveyCompleted: this.isSurveyCompleted,
    };
  }

  public toNewObject(): {
    email: string;
    passwordHash: string;
    passwordSalt: string;
    isSurveyCompleted: boolean;
  } {
    return {
      email: this.email,
      passwordHash: this.passwordHash,
      passwordSalt: this.passwordSalt,
      isSurveyCompleted: this.isSurveyCompleted,
    };
  }
}

export { UserEntity };
