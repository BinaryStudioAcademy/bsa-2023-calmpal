import { Model, type RelationMappings } from 'objection';

import {
  AbstractModel,
  CommonTableColumn,
  DatabaseTableName,
} from '#libs/packages/database/database.js';

import { UserDetailsTableColumn } from './libs/enums/enums.js';
import { UserModel } from './user.model.js';

class UserDetailsModel extends AbstractModel {
  public fullName!: string;

  public static override get tableName(): string {
    return DatabaseTableName.USER_DETAILS;
  }

  public static get relationMappings(): RelationMappings {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: `${DatabaseTableName.USER_DETAILS}.${UserDetailsTableColumn.USER_ID}`,
          to: `${DatabaseTableName.USERS}.${CommonTableColumn.ID}`,
        },
      },
    };
  }
}

export { UserDetailsModel };
