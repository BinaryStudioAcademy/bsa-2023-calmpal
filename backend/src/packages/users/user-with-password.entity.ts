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
  }: {
    id: number | null;
    email: string;
    fullName: string;
    passwordHash: string;
    passwordSalt: string;
    createdAt: Date | null;
    updatedAt: Date | null;
  }) {
    super({
      id,
      email,
      fullName,
      createdAt,
      updatedAt,
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
  }: {
    id: number;
    email: string;
    fullName: string;
    passwordHash: string;
    passwordSalt: string;
    createdAt: Date;
    updatedAt: Date;
  }): UserWithPasswordEntity {
    return new UserWithPasswordEntity({
      id,
      email,
      fullName,
      passwordHash,
      passwordSalt,
      createdAt,
      updatedAt,
    });
  }

  public static initializeNewWithPassword({
    email,
    fullName,
    passwordHash,
    passwordSalt,
  }: {
    email: string;
    fullName: string;
    passwordHash: string;
    passwordSalt: string;
  }): UserWithPasswordEntity {
    return new UserWithPasswordEntity({
      id: null,
      email,
      fullName,
      passwordHash,
      passwordSalt,
      createdAt: null,
      updatedAt: null,
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
