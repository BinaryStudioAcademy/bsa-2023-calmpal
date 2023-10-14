import { Model, type RelationMappings } from 'objection';

import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';

import { UserRolesTableColumn, UsersTableColumn } from './libs/enums/enums.js';
import { UserModel } from './user.model.js';

class UserRolesModel extends AbstractModel {
  public name!: string;

  public key!: string;

  public static override get tableName(): string {
    return DatabaseTableName.USER_ROLES;
  }

  public static get relationMappings(): RelationMappings {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: `${DatabaseTableName.USER_ROLES}.${UserRolesTableColumn.ID}`,
          to: `${DatabaseTableName.USERS}.${UsersTableColumn.ROLE_ID}`,
        },
      },
    };
  }
}

export { UserRolesModel };
