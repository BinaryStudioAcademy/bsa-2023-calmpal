import { type Entity } from '#libs/types/types.js';

class ChatEntity implements Entity {
  private id: number | null;

  private name: string;

  private members: number[];

  private createdAt: Date | null;

  private updatedAt: Date | null;

  private constructor({
    id,
    name,
    members,
    createdAt,
    updatedAt,
  }: {
    id: number | null;
    name: string;
    members: number[];
    createdAt: Date | null;
    updatedAt: Date | null;
  }) {
    this.id = id;
    this.name = name;
    this.members = members;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static initialize({
    id,
    name,
    members,
    createdAt,
    updatedAt,
  }: {
    id: number;
    name: string;
    members: number[];
    createdAt: Date;
    updatedAt: Date;
  }): ChatEntity {
    return new ChatEntity({
      id,
      name,
      members,
      createdAt,
      updatedAt,
    });
  }

  public static initializeNew({
    name,
    members,
  }: {
    name: string;
    members: number[];
  }): ChatEntity {
    return new ChatEntity({
      id: null,
      name,
      members,
      createdAt: null,
      updatedAt: null,
    });
  }

  public toObject(): {
    id: number;
    name: string;
    members: number[];
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this.id as number,
      name: this.name,
      members: this.members,
      createdAt: this.createdAt as Date,
      updatedAt: this.updatedAt as Date,
    };
  }

  public toNewObject(): {
    name: string;
    members: number[];
  } {
    return {
      name: this.name,
      members: this.members,
    };
  }
}

export { ChatEntity };
