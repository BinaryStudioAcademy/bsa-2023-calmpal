import { type Service } from '#libs/types/types.js';

import { type ChatRepository } from './chat.repository.js';
import { type ChatsGetAllResponseDto } from './libs/types/types.js';

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

  public async findAllByUserId(
    userId: number,
  ): Promise<ChatsGetAllResponseDto> {
    const items = await this.chatRepository.findAllByUserId(userId);

    return {
      items: items.map((item) => {
        return item.toObject();
      }),
    };
  }

  public create(): ReturnType<Service['create']> {
    return Promise.resolve(null);
  }

  public update(): ReturnType<Service['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<Service['delete']> {
    return Promise.resolve(true);
  }
}

export { ChatService };
