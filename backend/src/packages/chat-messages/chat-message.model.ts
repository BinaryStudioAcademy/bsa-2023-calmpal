import { Model, type RelationMappings } from 'objection';

import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';
import { ChatModel } from '~/packages/chats/chat.model.js';
import { ChatsTableColumn } from '~/packages/chats/libs/enums/enums.js';
import { UsersTableColumn } from '~/packages/users/libs/enums/enums.js';
import { UserDetailsModel } from '~/packages/users/user-details.model.js';

import { ChatMessagesTableColumn } from './libs/enums/enums.js';

class ChatMessageModel extends AbstractModel {
  public message!: string;

  public chatId!: number;

  public senderId!: number;

  public static override get tableName(): string {
    return DatabaseTableName.CHAT_MESSAGES;
  }

  public static relationMappings(): RelationMappings {
    return {
      sender: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserDetailsModel,
        join: {
          from: `${DatabaseTableName.CHAT_MESSAGES}.${ChatMessagesTableColumn.SENDER_ID}`,
          to: `${DatabaseTableName.USERS}.${UsersTableColumn.ID}`,
        },
      },

      chats: {
        relation: Model.BelongsToOneRelation,
        modelClass: ChatModel,
        join: {
          from: `${DatabaseTableName.CHAT_MESSAGES}.${ChatMessagesTableColumn.CHAT_ID}`,
          to: `${DatabaseTableName.CHATS}.${ChatsTableColumn.ID}`,
        },
      },
    };
  }
}

export { ChatMessageModel };
