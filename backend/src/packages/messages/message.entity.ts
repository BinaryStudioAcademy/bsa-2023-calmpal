import { type Entity } from '#libs/types/types.js';

class MessageEntity implements Entity {
  private id: number | null;

  private createdAt: Date | null;

  private updatedAt: Date | null;

  private name: string;

  private message: string;

  private sender_id: string;

  public constructor({
    id,
    createdAt,
    updatedAt,
    name,
    message,
    sender_id,
  }: {
    id: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    name: string;
    message: string;
    sender_id: string;
  }) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.name = name;
    this.message = message;
    this.sender_id = sender_id;
  }

  public static initialize({
    id,
    createdAt,
    updatedAt,
    name,
    message,
    sender_id,
  }: {
    id: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    name: string;
    message: string;
    sender_id: string;
  }): MessageEntity {
    return new MessageEntity({
      id,
      createdAt,
      updatedAt,
      name,
      message,
      sender_id,
    });
  }

  public toObject(): {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    message: string;
    sender_id: string;
  } {
    return {
      id: this.id as number,
      createdAt: this.createdAt as Date,
      updatedAt: this.updatedAt as Date,
      name: this.name,
      message: this.message,
      sender_id: this.sender_id,
    };
  }

  public toNewObject(): {
    name: string;
    message: string;
    sender_id: string;
  } {
    return {
      name: this.name,
      message: this.message,
      sender_id: this.sender_id,
    };
  }
}

export { MessageEntity };
