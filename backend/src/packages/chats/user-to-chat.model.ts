import {
  AbstractModel,
  DatabaseTableName,
} from '#libs/packages/database/database.js';

class UserToChatModel extends AbstractModel {
  public userId!: number;

  public chatId!: number;

  public static override get tableName(): string {
    return DatabaseTableName.USERS_TO_CHATS;
  }
}

export { UserToChatModel };
