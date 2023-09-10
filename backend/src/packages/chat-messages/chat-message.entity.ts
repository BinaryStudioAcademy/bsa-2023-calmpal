import { type Entity } from '#libs/types/types.js';

class ChatMessageEntity implements Entity {
  private id: number | null;

  private createdAt: Date | null;

  private updatedAt: Date | null;

  private name: string;

  private message: string;

  private chatId: number;

  private senderId: number;

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
    chatId: number;
    senderId: number;
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
    chatId: number;
    senderId: number;
  }): ChatMessageEntity {
    return new ChatMessageEntity({
      id,
      createdAt,
      updatedAt,
      name,
      message,
      chatId,
      senderId,
    });
  }

  public static initializeNew({
    name,
    message,
    chatId,
    senderId,
  }: {
    name: string;
    message: string;
    chatId: number;
    senderId: number;
  }): ChatMessageEntity {
    return new ChatMessageEntity({
      id: null,
      createdAt: null,
      updatedAt: null,
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
    chatId: number;
    senderId: number;
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
    chatId: number;
    senderId: number;
  } {
    return {
      name: this.name,
      message: this.message,
      chatId: this.chatId,
      senderId: this.senderId,
    };
  }
}

export { ChatMessageEntity };
