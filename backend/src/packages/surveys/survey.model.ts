import { Model, type RelationMappings } from 'objection';

import {
  AbstractModel,
  DatabaseTableName,
} from '#libs/packages/database/database.js';
import { UserModel } from '#packages/users/user.model.js';

class SurveyModel extends AbstractModel {
  public userId!: number;

  public preferences!: string[];

  public static override get tableName(): string {
    return DatabaseTableName.SURVEYS;
  }

  public static get relationMappings(): RelationMappings {
    return {
      users: {
        relation: Model.HasOneRelation,
        modelClass: UserModel,
        join: {
          from: `${DatabaseTableName.SURVEYS}.user_id`,
          to: `${DatabaseTableName.USERS}.id`,
        },
      },
    };
  }
}

export { SurveyModel };
