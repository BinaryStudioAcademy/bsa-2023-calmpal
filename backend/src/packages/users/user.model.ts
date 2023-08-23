import { Model, type RelationMappings } from 'objection';

import {
  AbstractModel,
  CommonTableColumn,
  DatabaseTableName,
} from '#libs/packages/database/database.js';

import { UserDetailsTableColumn } from './libs/enums/enums.js';
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
          from: `${DatabaseTableName.USERS}.${CommonTableColumn.ID}`,
          to: `${DatabaseTableName.USER_DETAILS}.${UserDetailsTableColumn.USER_ID}`,
        },
      },
    };
  }
}

export { UserModel };
