import { type Service } from '#libs/types/types.js';

import { MessageEntity } from './message.entity.js';
import { type MessageRepository } from './message.repository.js';

type CreateMessageRequestDto = {
  name: string;
  message: string;
  senderId: string;
  chatId: string;
};

type CreateMessageResponseDto = {
  id: number;
  name: string;
  message: string;
  senderId: string;
  chatId: string;
};

class MessageService implements Service {
  private messageRepository: MessageRepository;

  public constructor(messageRepository: MessageRepository) {
    this.messageRepository = messageRepository;
  }

  public find(): ReturnType<Service['find']> {
    return Promise.resolve(null);
  }

  public async findAll(): ReturnType<Service['findAll']> {
    return await Promise.resolve({ items: [] });
  }

  public async create(
    payload: CreateMessageRequestDto,
  ): Promise<CreateMessageResponseDto> {
    const newMessage = await this.messageRepository.create(
      MessageEntity.initializeNew({
        name: payload.name,
        message: payload.message,
        chatId: payload.chatId,
        senderId: payload.senderId,
      }),
    );

    return newMessage.toObject();
  }

  public async findAllByChatId(
    chatId: string,
  ): Promise<ReturnType<MessageEntity['toObject']>[] | null> {
    const messages = await this.messageRepository.findAllByChatId(chatId);
    if (!messages) {
      return null;
    }

    return messages.map((message) => {
      return message.toObject();
    });
  }

  public update(): ReturnType<Service['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<Service['delete']> {
    return Promise.resolve(true);
  }
}

export { MessageService };
