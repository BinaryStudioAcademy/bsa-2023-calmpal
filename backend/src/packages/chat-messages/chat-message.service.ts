import { ExceptionMessage, HTTPCode, UsersError } from 'shared/build/index.js';

import { type Service } from '#libs/types/types.js';
import { userService } from '#packages/users/users.js';

import { ChatMessageEntity } from './chat-message.entity.js';
import { type ChatMessageRepository } from './chat-message.repository.js';
import {
  type ChatMessageCreateData,
  type ChatMessageGetAllItemResponseDto,
  type ChatMessageGetAllResponseDto,
} from './libs/types/types.js';

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
    payload: ChatMessageCreateData,
  ): Promise<ChatMessageGetAllItemResponseDto> {
    const sender = await userService.findById(payload.senderId);
    if (!sender) {
      throw new UsersError({
        status: HTTPCode.NOT_FOUND,
        message: ExceptionMessage.USER_NOT_FOUND,
      });
    }

    const chatMessage = await this.chatMessageRepository.create(
      ChatMessageEntity.initializeNew({
        message: payload.message,
        chatId: payload.chatId,
        senderId: payload.senderId,
      }),
    );

    return chatMessage.toObject();
  }

  public async findAllByChatId(
    chatId: number,
  ): Promise<ChatMessageGetAllResponseDto> {
    const chatMessages = await this.chatMessageRepository.findAllByChatId(
      chatId,
    );

    return {
      items: chatMessages.map((chatMessage) => {
        return chatMessage.toObject();
      }),
    };
  }

  public update(): ReturnType<Service['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<Service['delete']> {
    return Promise.resolve(true);
  }
}

export { ChatMessageService };
