import { type Entity } from '#libs/types/types.js';

class MessageEntity implements Entity {
  private id: number | null;

  private createdAt: Date | null;

  private updatedAt: Date | null;

  private name: string;

  private message: string;

  private chat_id: string;

  public constructor({
    id,
    createdAt,
    updatedAt,
    name,
    message,
    chat_id,
  }: {
    id: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    name: string;
    message: string;
    chat_id: string;
  }) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.name = name;
    this.message = message;
    this.chat_id = chat_id;
  }

  public static initialize({
    id,
    createdAt,
    updatedAt,
    name,
    message,
    chat_id,
  }: {
    id: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    name: string;
    message: string;
    chat_id: string;
  }): MessageEntity {
    return new MessageEntity({
      id,
      createdAt,
      updatedAt,
      name,
      message,
      chat_id,
    });
  }

  public toObject(): {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    message: string;
    chat_id: string;
  } {
    return {
      id: this.id as number,
      createdAt: this.createdAt as Date,
      updatedAt: this.updatedAt as Date,
      name: this.name,
      message: this.message,
      chat_id: this.chat_id,
    };
  }

  public toNewObject(): {
    name: string;
    message: string;
    chat_id: string;
  } {
    return {
      name: this.name,
      message: this.message,
      chat_id: this.chat_id,
    };
  }
}

export { MessageEntity };
