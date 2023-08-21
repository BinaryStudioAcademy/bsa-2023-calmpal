import { Model } from 'objection';

import { AbstractModel, DatabaseTableName } from '#libs/packages/database/database.js';

import { type RelationMappingsType } from './libs/types/types.js';
import { UserModel } from './user.model.js';



class UserDetailsModel extends AbstractModel {
  public fullName!: string;

  public static override get tableName(): string {
    return DatabaseTableName.USER_DETAILS;
  }

  public static get relationMappings(): RelationMappingsType {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'user_details.user_id',
          to: 'users.id',
        },
      },
    };
  }
}

export { UserDetailsModel };
