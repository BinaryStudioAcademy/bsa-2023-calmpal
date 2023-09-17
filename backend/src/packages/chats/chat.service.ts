import { type Service } from '#libs/types/types.js';

import { type ChatEntity } from './chat.entity.js';
import { type ChatRepository } from './chat.repository.js';
import {
  type ChatGetAllItemResponseDto,
  type ChatGetAllResponseDto,
  type CreateChatPayload,
} from './libs/types/types.js';

class ChatService implements Service {
  private chatRepository: ChatRepository;

  public constructor(chatRepository: ChatRepository) {
    this.chatRepository = chatRepository;
  }

  public find(): ReturnType<Service['find']> {
    return Promise.resolve(null);
  }

  public async findById(
    id: number,
  ): Promise<ReturnType<ChatEntity['toObject']> | null> {
    const chat = await this.chatRepository.findById(id);

    return chat?.toObject() ?? null;
  }

  public async findAll(): ReturnType<Service['findAll']> {
    return await Promise.resolve({ items: [] });
  }

  public async findAllByUserId(userId: number): Promise<ChatGetAllResponseDto> {
    const items = await this.chatRepository.findAllByUserId(userId);

    return {
      items: items.map((item) => {
        return item.toObject();
      }),
    };
  }

  public async create(
    payload: CreateChatPayload,
  ): Promise<ChatGetAllItemResponseDto> {
    const item = await this.chatRepository.create(payload);

    return item.toObject();
  }

  public update(): ReturnType<Service['update']> {
    return Promise.resolve(null);
  }

  public async delete(id: number): Promise<boolean> {
    const chat = await this.findById(id);
    if (!chat) {
      return false;
    }

    return await this.chatRepository.delete(id);
  }
}

export { ChatService };
