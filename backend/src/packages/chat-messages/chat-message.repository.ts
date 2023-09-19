import { type Repository } from '#libs/types/types.js';

import { ChatMessageEntity } from './chat-message.entity.js';
import { type ChatMessageModel } from './chat-message.model.js';

class ChatMessageRepository implements Repository {
  private chatMessageModel: typeof ChatMessageModel;

  public constructor(chatMessageModel: typeof ChatMessageModel) {
    this.chatMessageModel = chatMessageModel;
  }

  public find(): ReturnType<Repository['find']> {
    return Promise.resolve(null);
  }

  public async findAll(): ReturnType<Repository['findAll']> {
    return await Promise.resolve([]);
  }

  public async findAllByChatId(chatId: number): Promise<ChatMessageEntity[]> {
    const chatMessages = await this.chatMessageModel.query().where({ chatId });

    return chatMessages.map((chatMessage) => {
      return ChatMessageEntity.initialize({
        id: chatMessage.id,
        createdAt: new Date(chatMessage.createdAt),
        updatedAt: new Date(chatMessage.updatedAt),
        message: chatMessage.message,
        senderId: chatMessage.senderId,
        chatId: chatMessage.chatId,
      });
    });
  }

  public async create(entity: ChatMessageEntity): Promise<ChatMessageEntity> {
    const { message, chatId, senderId } = entity.toNewObject();

    const chatMessage = await this.chatMessageModel
      .query()
      .insertGraph({
        message,
        chatId,
        senderId,
      })
      .execute();

    return ChatMessageEntity.initialize({
      id: chatMessage.id,
      message: chatMessage.message,
      chatId: chatMessage.chatId,
      senderId: chatMessage.senderId,
      createdAt: new Date(chatMessage.createdAt),
      updatedAt: new Date(chatMessage.updatedAt),
    });
  }

  public update(): ReturnType<Repository['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<Repository['delete']> {
    return Promise.resolve(true);
  }
}

export { ChatMessageRepository };
