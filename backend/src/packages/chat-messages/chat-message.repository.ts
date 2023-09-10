import { EMPTY_ARRAY_LENGTH } from '#libs/constants/constants.js';
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

  public async findAllByChatId(
    chatId: string,
  ): Promise<ChatMessageEntity[] | null> {
    const chatMessages = await this.chatMessageModel
      .query()
      .where('chatId', chatId);

    if (chatMessages.length === EMPTY_ARRAY_LENGTH) {
      return null;
    }

    return chatMessages.map((chatMessage) => {
      return ChatMessageEntity.initialize({
        id: chatMessage.id,
        createdAt: new Date(chatMessage.createdAt),
        updatedAt: new Date(chatMessage.updatedAt),
        name: chatMessage.name,
        message: chatMessage.message,
        senderId: chatMessage.senderId,
        chatId: chatMessage.chatId,
      });
    });
  }

  public async create(entity: ChatMessageEntity): Promise<ChatMessageEntity> {
    const { name, message, chatId, senderId } = entity.toNewObject();

    const chatMessage = await this.chatMessageModel
      .query()
      .insertGraph({
        name,
        message,
        chatId,
        senderId,
      })
      .execute();

    return ChatMessageEntity.initialize({
      id: chatMessage.id,
      name: chatMessage.name,
      message: chatMessage.message,
      chatId: chatMessage.chatId,
      senderId: chatMessage.senderId,
      createdAt: new Date(chatMessage.createdAt),
      updatedAt: new Date(chatMessage.updatedAt),
    });
  }

  public update(): ReturnType<Repository['delete']> {
    return Promise.resolve(true);
  }

  public delete(): ReturnType<Repository['delete']> {
    return Promise.resolve(true);
  }
}

export { ChatMessageRepository };