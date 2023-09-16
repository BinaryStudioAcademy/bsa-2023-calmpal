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

import {
  UserDetailsTableColumn,
  UsersTableColumn,
} from './libs/enums/enums.js';
import { UserDetailsModel } from './user-details.model.js';

class UserModel extends AbstractModel {
  public email!: string;

  public passwordHash!: string;

  public passwordSalt!: string;

  public deletedAt?: Date;

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
    };
  }
}

export { UserModel };
