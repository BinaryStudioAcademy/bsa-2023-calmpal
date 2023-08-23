import { type Entity } from '#libs/types/types.js';

class UserEntity implements Entity {
  private id: number | null;
  private createdAt: Date | null;
  private updatedAt: Date | null;
  private email: string;
  private passwordHash: string;
  private passwordSalt: string;
  private constructor({
    id,
    email,
    passwordHash,
    passwordSalt,
    createdAt,
    updatedAt,
  }: {
    id: number | null;
    email: string;
    passwordHash: string;
    passwordSalt: string;
    createdAt: Date | string | null;
    updatedAt: Date | string | null;
  }) {
    this.id = id;
    this.email = email;
    this.passwordHash = passwordHash;
    this.passwordSalt = passwordSalt;
    this.createdAt = createdAt ? new Date(createdAt) : null;
    this.updatedAt = updatedAt ? new Date(updatedAt) : null;
  }
  public static initialize({
    id,
    email,
    passwordHash,
    passwordSalt,
    createdAt,
    updatedAt,
  }: {
    id: number;
    email: string;
    passwordHash: string;
    passwordSalt: string;
    createdAt: Date | string;
    updatedAt: Date | string;
  }): UserEntity {
    return new UserEntity({
      id,
      email,
      passwordHash,
      passwordSalt,
      createdAt: new Date(createdAt),
      updatedAt: new Date(updatedAt),
    });
  }
  public static initializeNew({
    email,
    passwordHash,
    passwordSalt,
  }: {
    email: string;
    passwordHash: string;
    passwordSalt: string;
  }): UserEntity {
    return new UserEntity({
      id: null,
      email,
      passwordHash,
      passwordSalt,
      createdAt: null,
      updatedAt: null,
    });
  }
  public toObject(): {
    id: number;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this.id as number,
      email: this.email,
      createdAt: this.createdAt as Date,
      updatedAt: this.updatedAt as Date,
    };
  }
  public toNewObject(): {
    email: string;
    passwordHash: string;
    passwordSalt: string;
  } {
    return {
      email: this.email,
      passwordHash: this.passwordHash,
      passwordSalt: this.passwordSalt,
    };
  }
}

export { UserEntity };
