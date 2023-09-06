import {
  AbstractModel,
  DatabaseTableName,
} from '#libs/packages/database/database.js';

class ChatModel extends AbstractModel {
  public name!: string;

  public members!: number[];

  public static override get tableName(): string {
    return DatabaseTableName.CHATS;
  }
}

export { ChatModel };
