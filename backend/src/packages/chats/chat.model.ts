import { Model, type RelationMappings } from 'objection';

import {
  AbstractModel,
  DatabaseTableName,
} from '#libs/packages/database/database.js';

import {
  ChatsTableColumn,
  UsersToChatsTableColumn,
} from './libs/enums/enums.js';
import { UserToChatModel } from './user-to-chat.model.js';

class ChatModel extends AbstractModel {
  public name!: string;

  public static override get tableName(): string {
    return DatabaseTableName.CHATS;
  }

  public static get relationMappings(): RelationMappings {
    return {
      members: {
        relation: Model.HasManyRelation,
        modelClass: UserToChatModel,
        join: {
          from: `${DatabaseTableName.CHATS}.${ChatsTableColumn.ID}`,
          to: `${DatabaseTableName.USERS_TO_CHATS}.${UsersToChatsTableColumn.CHAT_ID}`,
        },
      },
    };
  }
}

export { ChatModel };
