import { type Repository } from '#libs/types/types.js';

import { ChatEntity } from './chat.entity.js';
import { type ChatModel } from './chat.model.js';

class ChatRepository implements Repository {
  private chatModel: typeof ChatModel;

  public constructor(chatModel: typeof ChatModel) {
    this.chatModel = chatModel;
  }

  public find(): ReturnType<Repository['find']> {
    return Promise.resolve(null);
  }

  public findAll(): ReturnType<Repository['findAll']> {
    return Promise.resolve([]);
  }

  public async findAllByUserId(userId: number): Promise<ChatEntity[]> {
    const chats = await this.chatModel
      .query()
      .where('members', '@>', [userId])
      .orderBy('createdAt', 'DESC');

    return chats.map((chat) => {
      return ChatEntity.initialize({
        id: chat.id,
        name: chat.name,
        members: chat.members,
        createdAt: new Date(chat.createdAt),
        updatedAt: new Date(chat.updatedAt),
      });
    });
  }

  public async create(entity: ChatEntity): Promise<ChatEntity> {
    const { members, name } = entity.toNewObject();

    const survey = await this.chatModel.query().insertGraph({
      name,
      members,
    });

    return ChatEntity.initialize({
      id: survey.id,
      name: survey.name,
      members: survey.members,
      createdAt: new Date(survey.createdAt),
      updatedAt: new Date(survey.updatedAt),
    });
  }

  public update(): Promise<unknown> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<Repository['delete']> {
    return Promise.resolve(false);
  }
}

export { ChatRepository };
