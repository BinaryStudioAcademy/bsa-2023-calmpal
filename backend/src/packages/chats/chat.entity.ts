import { type Entity } from '#libs/types/types.js';

import { type UserToChatQueryResponse } from './libs/types/types.js';

class ChatEntity implements Entity {
  private id: number | null;

  private name: string;

  private members: UserToChatQueryResponse[];

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
    members: UserToChatQueryResponse[];
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
    members: UserToChatQueryResponse[];
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

  public static initializeNew({ name }: { name: string }): ChatEntity {
    return new ChatEntity({
      id: null,
      name,
      members: [],
      createdAt: null,
      updatedAt: null,
    });
  }

  public toObject(): {
    id: number;
    name: string;
    members: UserToChatQueryResponse[];
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
  } {
    return {
      name: this.name,
    };
  }
}

export { ChatEntity };
