import { Model } from 'objection';

import {
  AbstractModel,
  DatabaseTableName,
} from '#libs/packages/database/database.js';
import {
  CommonTableColumns,
  UserDetailsTableColumns,
} from '#libs/packages/database/libs/enums/enums.js';

import { type RelationMappingsType } from './libs/types/types.js';
import { UserDetailsModel } from './user-details.model.js';

class UserModel extends AbstractModel {
  public email!: string;

  public passwordHash!: string;

  public passwordSalt!: string;

  public static override get tableName(): string {
    return DatabaseTableName.USERS;
  }

  public static relationMappings(): RelationMappingsType {
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
