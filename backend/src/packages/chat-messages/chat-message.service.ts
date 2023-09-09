import { type Service } from '#libs/types/types.js';

import { ChatMessageEntity } from './chat-message.entity.js';
import { type ChatMessageRepository } from './chat-message.repository.js';

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

class ChatMessageService implements Service {
  private chatMessageRepository: ChatMessageRepository;

  public constructor(chatMessageRepository: ChatMessageRepository) {
    this.chatMessageRepository = chatMessageRepository;
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
    const chatMessage = await this.chatMessageRepository.create(
      ChatMessageEntity.initializeNew({
        name: payload.name,
        message: payload.message,
        chatId: payload.chatId,
        senderId: payload.senderId,
      }),
    );

    return chatMessage.toObject();
  }

  public async findAllByChatId(
    chatId: string,
  ): Promise<ReturnType<ChatMessageEntity['toObject']>[] | null> {
    const chatMessages = await this.chatMessageRepository.findAllByChatId(
      chatId,
    );
    if (!chatMessages) {
      return null;
    }

    return chatMessages.map((chatMessage) => {
      return chatMessage.toObject();
    });
  }

  public update(): ReturnType<Service['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<Service['delete']> {
    return Promise.resolve(true);
  }
}

export { ChatMessageService };
