import { ExceptionMessage } from '#libs/enums/enums.js';
import { ChatError } from '#libs/exceptions/exceptions.js';
import { HTTPCode } from '#libs/packages/http/http.js';
import { type Service } from '#libs/types/types.js';
import {
  type ChatMessageCreatePayload,
  type ChatMessageGetAllItemResponseDto,
  type ChatMessageGetAllResponseDto,
  type ChatMessageService,
} from '#packages/chat-messages/chat-messages.js';

import { type ChatRepository } from './chat.repository.js';
import {
  type ChatGetAllItemResponseDto,
  type ChatGetAllResponseDto,
  type CreateChatPayload,
} from './libs/types/types.js';

type Constructor = {
  chatRepository: ChatRepository;
  chatMessageService: ChatMessageService;
};

class ChatService implements Service {
  private chatRepository: ChatRepository;

  private chatMessageService: ChatMessageService;

  public constructor({ chatRepository, chatMessageService }: Constructor) {
    this.chatRepository = chatRepository;
    this.chatMessageService = chatMessageService;
  }

  public find(): ReturnType<Service['find']> {
    return Promise.resolve(null);
  }

  public async findAll(): ReturnType<Service['findAll']> {
    return await Promise.resolve({ items: [] });
  }

  public async findAllByUserId(
    userId: number,
    query: string,
  ): Promise<ChatGetAllResponseDto> {
    const items = await this.chatRepository.findAllByUserId(userId, query);

    return {
      items: items.map((item) => {
        return item.toObject();
      }),
    };
  }

  public findAllMessagesByChatId(
    chatId: number,
  ): Promise<ChatMessageGetAllResponseDto> {
    return this.chatMessageService.findAllByChatId(chatId);
  }

  public async create({
    chatEntity,
    message,
    userId,
  }: CreateChatPayload): Promise<ChatGetAllItemResponseDto> {
    const createdChat = await this.chatRepository.create({
      chatEntity,
      members: [userId],
    });

    const chat = createdChat.toObject();

    await this.chatMessageService.create({
      message,
      chatId: chat.id,
      senderId: userId,
    });

    await this.chatMessageService.generateReply({
      message,
      chatId: chat.id,
      senderId: userId,
    });

    return chat;
  }

  public createMessage(
    payload: ChatMessageCreatePayload,
  ): Promise<ChatMessageGetAllItemResponseDto> {
    return this.chatMessageService.create(payload);
  }

  public generateReply(
    payload: ChatMessageCreatePayload,
  ): Promise<ChatMessageGetAllItemResponseDto> {
    return this.chatMessageService.generateReply(payload);
  }

  public update(): ReturnType<Service['update']> {
    return Promise.resolve(null);
  }

  public async delete({
    id,
    userId,
  }: {
    id: number;
    userId: number;
  }): Promise<boolean> {
    const deletedCount = await this.chatRepository.delete({ id, userId });
    if (!deletedCount) {
      throw new ChatError({
        status: HTTPCode.NOT_FOUND,
        message: ExceptionMessage.CHAT_NOT_FOUND,
      });
    }

    return Boolean(deletedCount);
  }
}

export { ChatService };
