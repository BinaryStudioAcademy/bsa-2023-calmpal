import { Model, type RelationMappings } from 'objection';

import {
  AbstractModel,
  DatabaseTableName,
} from '#libs/packages/database/database.js';
import { UsersTableColumn } from '#packages/users/libs/enums/enums.js';
import { UserDetailsModel } from '#packages/users/user-details.model.js';

import { ChatMessagesTableColumn } from './libs/enums/chat-messages-table-column.enum.js';

class MessageModel extends AbstractModel {
  public name!: string;
  public message!: string;
  public chat_id!: string;

  public static override get tableName(): string {
    return DatabaseTableName.CHAT_MESSAGES;
  }

  public static relationMappings(): RelationMappings {
    return {
      sender: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserDetailsModel,
        join: {
          from: `${DatabaseTableName.CHAT_MESSAGES}
                            .${ChatMessagesTableColumn.SENDER_ID}`,
          to: `${DatabaseTableName.USERS}.${UsersTableColumn.ID}`,
        },
      },
    };
  }
}

export { MessageModel };
