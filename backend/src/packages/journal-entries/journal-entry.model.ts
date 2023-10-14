import { Model, type RelationMappings } from 'objection';

import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';
import { UsersTableColumn } from '~/packages/users/libs/enums/enums.js';
import { UserModel } from '~/packages/users/user.model.js';

import { JournalEntriesTableColumn } from './libs/enums/enums.js';

class JournalEntryModel extends AbstractModel {
  public title!: string;

  public text!: string;

  public userId!: number;

  public static override get tableName(): string {
    return DatabaseTableName.JOURNAL_ENTRIES;
  }

  public static get relationMappings(): RelationMappings {
    return {
      users: {
        relation: Model.HasOneRelation,
        modelClass: UserModel,
        join: {
          from: `${DatabaseTableName.JOURNAL_ENTRIES}.${JournalEntriesTableColumn.USER_ID}`,
          to: `${DatabaseTableName.USERS}.${UsersTableColumn.ID}`,
        },
      },
    };
  }
}

export { JournalEntryModel };
