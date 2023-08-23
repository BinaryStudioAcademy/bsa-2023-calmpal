import { Model, type RelationMappings } from 'objection';

import {
  AbstractModel,
  DatabaseTableName,
  CommonTableColumns,
  UserDetailsTableColumns
} from '#libs/packages/database/database.js';

import { UserDetailsModel } from './user-details.model.js';

class UserModel extends AbstractModel {
  public email!: string;

  public passwordHash!: string;

  public passwordSalt!: string;

  public static override get tableName(): string {
    return DatabaseTableName.USERS;
  }

  public static relationMappings(): RelationMappings {
    return {
      details: {
        relation: Model.HasOneRelation,
        modelClass: UserDetailsModel,
        join: {
          from: `${DatabaseTableName.USERS}.${CommonTableColumns.ID}`,
          to: `${DatabaseTableName.USER_DETAILS}.${UserDetailsTableColumns.USER_ID}`,
        },
      },
    };
  }
}

export { UserModel };
