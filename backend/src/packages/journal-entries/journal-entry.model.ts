import {
  AbstractModel,
  DatabaseTableName,
} from '#libs/packages/database/database.js';

class JournalEntryModel extends AbstractModel {
  public title!: string;

  public text!: string;

  public static override get tableName(): string {
    return DatabaseTableName.JOURNAL_ENTRIES;
  }
}

export { JournalEntryModel };
