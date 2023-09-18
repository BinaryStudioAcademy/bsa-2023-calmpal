import { ExceptionMessage, HTTPCode, UsersError } from 'shared/build/index.js';

import { type Service } from '#libs/types/types.js';
import { userService } from '#packages/users/users.js';

import { ChatMessageEntity } from './chat-message.entity.js';
import { type ChatMessageRepository } from './chat-message.repository.js';
import {
  type ChatMessageCreateData,
  type ChatMessageGetAllItemResponseDto,
} from './libs/types/types.js';

const MOCKED_SENDER_ID = 1;

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
    const sender = await userService.findById(MOCKED_SENDER_ID);
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
        senderId: MOCKED_SENDER_ID,
      }),
    );

    return chatMessage.toObject();
  }

  public async findAllByChatId(
    chatId: number,
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
