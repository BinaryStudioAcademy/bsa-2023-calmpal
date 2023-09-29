import { type Entity } from '#libs/types/types.js';

import { type UserToChatQueryResponse } from './libs/types/types.js';

class ChatEntity implements Entity {
  private id: number | null;

  private name: string;

  private members: UserToChatQueryResponse[];

  private createdAt: Date | null;

  private updatedAt: Date | null;

  private imageUrl: string | null;

  private constructor({
    id,
    name,
    members,
    createdAt,
    updatedAt,
    imageUrl,
  }: {
    id: number | null;
    name: string;
    members: UserToChatQueryResponse[];
    createdAt: Date | null;
    updatedAt: Date | null;
    imageUrl: string | null;
  }) {
    this.id = id;
    this.name = name;
    this.members = members;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.imageUrl = imageUrl;
  }

  public static initialize({
    id,
    name,
    members,
    createdAt,
    updatedAt,
    imageUrl,
  }: {
    id: number;
    name: string;
    members: UserToChatQueryResponse[];
    createdAt: Date;
    updatedAt: Date;
    imageUrl: string | null;
  }): ChatEntity {
    return new ChatEntity({
      id,
      name,
      members,
      createdAt,
      updatedAt,
      imageUrl,
    });
  }

  public static initializeNew({
    name,
    imageUrl,
  }: {
    name: string;
    imageUrl: string | null;
  }): ChatEntity {
    return new ChatEntity({
      id: null,
      name,
      members: [],
      createdAt: null,
      updatedAt: null,
      imageUrl,
    });
  }

  public toObject(): {
    id: number;
    name: string;
    members: UserToChatQueryResponse[];
    createdAt: Date;
    updatedAt: Date;
    imageUrl: string | null;
  } {
    return {
      id: this.id as number,
      name: this.name,
      members: this.members,
      createdAt: this.createdAt as Date,
      updatedAt: this.updatedAt as Date,
      imageUrl: this.imageUrl,
    };
  }

  public toNewObject(): {
    name: string;
    imageUrl: string | null;
  } {
    return {
      name: this.name,
      imageUrl: this.imageUrl,
    };
  }
}

export { ChatEntity };
