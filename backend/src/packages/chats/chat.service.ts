import { type Service } from '#libs/types/types.js';

import { ChatEntity } from './chat.entity.js';
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
    const item = await this.chatRepository.create(
      ChatEntity.initializeNew({
        name: payload.name,
        members: payload.members,
      }),
    );

    return item.toObject();
  }

  public update(): ReturnType<Service['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<Service['delete']> {
    return Promise.resolve(true);
  }
}

export { ChatService };
