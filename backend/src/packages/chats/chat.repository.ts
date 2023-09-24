import { SortType } from '#libs/enums/enums.js';
import { type Repository } from '#libs/types/types.js';

import { ChatEntity } from './chat.entity.js';
import { type ChatModel } from './chat.model.js';
import { ChatsRelation } from './libs/enums/enums.js';
import { type ChatCommonQueryResponse } from './libs/types/types.js';
import { UserToChatModel } from './user-to-chat.model.js';

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
      .withGraphJoined(ChatsRelation.MEMBERS)
      .whereExists(UserToChatModel.query().where({ userId }))
      .joinRelated('messages')
      .orderBy('messages.updatedAt', SortType.DESC)
      .castTo<ChatCommonQueryResponse[]>();

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

  public async create({
    chatEntity,
    members,
  }: {
    chatEntity: ChatEntity;
    members: number[];
  }): Promise<ChatEntity> {
    const { name } = chatEntity.toNewObject();

    const chat = await this.chatModel
      .query()
      .insertGraph({
        name,
        [ChatsRelation.MEMBERS]: members.map((member) => {
          return {
            userId: member,
          };
        }),
      })
      .castTo<ChatCommonQueryResponse>();

    return ChatEntity.initialize({
      id: chat.id,
      name: chat.name,
      members: chat.members,
      createdAt: new Date(chat.createdAt),
      updatedAt: new Date(chat.updatedAt),
    });
  }

  public update(): ReturnType<Repository['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<Repository['delete']> {
    //TODO
    const deletedId = 0;

    return Promise.resolve(deletedId);
  }
}

export { ChatRepository };
