import { type Entity } from '#libs/types/types.js';

class MessageEntity implements Entity {
  private id: number | null;

  private createdAt: Date | null;

  private updatedAt: Date | null;

  private name: string;

  private message: string;

  private chatId: string;

  private senderId: string;

  public constructor({
    id,
    createdAt,
    updatedAt,
    name,
    message,
    chatId,
    senderId,
  }: {
    id: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    name: string;
    message: string;
    chatId: string;
    senderId: string;
  }) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.name = name;
    this.message = message;
    this.chatId = chatId;
    this.senderId = senderId;
  }

  public static initialize({
    id,
    createdAt,
    updatedAt,
    name,
    message,
    chatId,
    senderId,
  }: {
    id: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    name: string;
    message: string;
    chatId: string;
    senderId: string;
  }): MessageEntity {
    return new MessageEntity({
      id,
      createdAt,
      updatedAt,
      name,
      message,
      chatId,
      senderId,
    });
  }

  public toObject(): {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    message: string;
    chatId: string;
    senderId: string;
  } {
    return {
      id: this.id as number,
      createdAt: this.createdAt as Date,
      updatedAt: this.updatedAt as Date,
      name: this.name,
      message: this.message,
      chatId: this.chatId,
      senderId: this.senderId,
    };
  }

  public toNewObject(): {
    name: string;
    message: string;
    chatId: string;
    senderId: string;
  } {
    return {
      name: this.name,
      message: this.message,
      chatId: this.chatId,
      senderId: this.senderId,
    };
  }
}

export { MessageEntity };
