import {
  Model,
  type Modifiers,
  type QueryBuilder,
  type RelationMappings,
} from 'objection';

import {
  AbstractModel,
  DatabaseTableName,
} from '#libs/packages/database/database.js';
import { JournalEntryModel } from '#packages/journal-entries/journal-entry.model.js';
import { JournalEntriesTableColumn } from '#packages/journal-entries/libs/enums/enums.js';

import {
  UserDetailsTableColumn,
  UserRolesTableColumn,
  UsersTableColumn,
} from './libs/enums/enums.js';
import { UserDetailsModel } from './user-details.model.js';
import { UserRolesModel } from './user-roles.model.js';

class UserModel extends AbstractModel {
  public email!: string;

  public passwordHash!: string;

  public passwordSalt!: string;

  public static override get tableName(): string {
    return DatabaseTableName.USERS;
  }

  public static override get modifiers(): Modifiers<QueryBuilder<UserModel>> {
    return {
      withoutPassword(builder): QueryBuilder<UserModel> {
        return builder.select(
          'users.id',
          'users.email',
          'users.created_at',
          'users.updated_at',
        );
      },
    };
  }

  public static relationMappings(): RelationMappings {
    return {
      details: {
        relation: Model.HasOneRelation,
        modelClass: UserDetailsModel,
        join: {
          from: `${DatabaseTableName.USERS}.${UsersTableColumn.ID}`,
          to: `${DatabaseTableName.USER_DETAILS}.${UserDetailsTableColumn.USER_ID}`,
        },
      },

      roles: {
        relation: Model.HasOneRelation,
        modelClass: UserRolesModel,
        join: {
          from: `${DatabaseTableName.USERS}.${UsersTableColumn.ROLE_ID}`,
          to: `${DatabaseTableName.USER_ROLES}.${UserRolesTableColumn.ID}`,
        },
      },

      journal: {
        relation: Model.HasManyRelation,
        modelClass: JournalEntryModel,
        join: {
          from: `${DatabaseTableName.USERS}.${UsersTableColumn.ID}`,
          to: `${DatabaseTableName.JOURNAL_ENTRIES}.${JournalEntriesTableColumn.USER_ID}`,
        },
      },
    };
  }
}

export { UserModel };
