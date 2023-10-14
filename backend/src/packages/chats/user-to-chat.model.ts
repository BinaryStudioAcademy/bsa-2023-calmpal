import { Model, type RelationMappings } from 'objection';

import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';

import { ChatModel } from './chat.model.js';
import {
  ChatsTableColumn,
  UsersToChatsTableColumn,
} from './libs/enums/enums.js';

class UserToChatModel extends AbstractModel {
  public userId!: number;

  public chatId!: number;

  public static override get tableName(): string {
    return DatabaseTableName.USERS_TO_CHATS;
  }

  public static get relationMappings(): RelationMappings {
    return {
      chat: {
        relation: Model.BelongsToOneRelation,
        modelClass: ChatModel,
        join: {
          from: `${DatabaseTableName.USERS_TO_CHATS}.${UsersToChatsTableColumn.CHAT_ID}`,
          to: `${DatabaseTableName.CHATS}.${ChatsTableColumn.ID}`,
        },
      },
    };
  }
}

export { UserToChatModel };
