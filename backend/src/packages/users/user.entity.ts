import { type Entity } from '#libs/types/types.js';

class UserEntity implements Entity {
  private id: number | null;

  private createdAt: Date | null;

  private updatedAt: Date | null;

  private email: string;

  private fullName: string;

  private isSurveyCompleted: boolean;

  private deletedAt: Date | null;

  public constructor({
    id,
    email,
    fullName,
    createdAt,
    updatedAt,
    isSurveyCompleted,
    deletedAt,
  }: {
    id: number | null;
    email: string;
    fullName: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    isSurveyCompleted: boolean;
    deletedAt: Date | null;
  }) {
    this.id = id;
    this.email = email;
    this.fullName = fullName;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isSurveyCompleted = isSurveyCompleted;
    this.deletedAt = deletedAt;
  }

  public static initialize({
    id,
    email,
    fullName,
    createdAt,
    updatedAt,
    isSurveyCompleted,
    deletedAt,
  }: {
    id: number | null;
    email: string;
    fullName: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    isSurveyCompleted: boolean;
    deletedAt: Date | null;
  }): UserEntity {
    return new UserEntity({
      id,
      email,
      fullName,
      createdAt,
      updatedAt,
      isSurveyCompleted,
      deletedAt,
    });
  }

  public static initializeNew({
    email,
    fullName,
    isSurveyCompleted = false,
  }: {
    email: string;
    fullName: string;
    isSurveyCompleted: boolean;
  }): UserEntity {
    return new UserEntity({
      id: null,
      email,
      fullName,
      createdAt: null,
      updatedAt: null,
      isSurveyCompleted,
      deletedAt: null,
    });
  }

  public toObject(): {
    id: number;
    email: string;
    fullName: string;
    createdAt: Date;
    updatedAt: Date;
    isSurveyCompleted: boolean;
    deletedAt: Date;
  } {
    return {
      id: this.id as number,
      email: this.email,
      fullName: this.fullName,
      createdAt: this.createdAt as Date,
      updatedAt: this.updatedAt as Date,
      isSurveyCompleted: this.isSurveyCompleted,
      deletedAt: this.deletedAt as Date,
    };
  }

  public toNewObject(): {
    email: string;
    fullName: string;
    isSurveyCompleted: boolean;
  } {
    return {
      email: this.email,
      fullName: this.fullName,
      isSurveyCompleted: this.isSurveyCompleted,
    };
  }
}

export { UserEntity };
