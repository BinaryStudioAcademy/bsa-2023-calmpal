import { type Entity } from '#libs/types/types.js';

class UserEntity implements Entity {
  private id: number | null;

  private createdAt: Date | null;

  private updatedAt: Date | null;

  private email: string;

  private fullName: string;

  public constructor({
    id,
    email,
    fullName,
    createdAt,
    updatedAt,
  }: {
    id: number | null;
    email: string;
    fullName: string;
    createdAt: Date | null;
    updatedAt: Date | null;
  }) {
    this.id = id;
    this.email = email;
    this.fullName = fullName;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static initialize({
    id,
    email,
    fullName,
    createdAt,
    updatedAt,
  }: {
    id: number;
    email: string;
    fullName: string;
    createdAt: Date;
    updatedAt: Date;
  }): UserEntity {
    return new UserEntity({
      id,
      email,
      fullName,
      createdAt,
      updatedAt,
    });
  }

  public static initializeNew({
    email,
    fullName,
  }: {
    email: string;
    fullName: string;
  }): UserEntity {
    return new UserEntity({
      id: null,
      email,
      fullName,
      createdAt: null,
      updatedAt: null,
    });
  }

  public toObject(): {
    id: number;
    email: string;
    fullName: string;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this.id as number,
      email: this.email,
      fullName: this.fullName,
      createdAt: this.createdAt as Date,
      updatedAt: this.updatedAt as Date,
    };
  }

  public toNewObject(): {
    email: string;
    fullName: string;
  } {
    return {
      email: this.email,
      fullName: this.fullName,
    };
  }
}

export { UserEntity };
