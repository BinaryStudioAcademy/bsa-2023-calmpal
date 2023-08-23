import { Model, type RelationMappings } from 'objection';

import {
  AbstractModel,
  DatabaseTableName,
} from '#libs/packages/database/database.js';
import { SurveyModel } from '#packages/surveys/survey.model.js';

class UserModel extends AbstractModel {
  public email!: string;

  public passwordHash!: string;

  public passwordSalt!: string;

  public static override get tableName(): string {
    return DatabaseTableName.USERS;
  }

  public static get relationMappings(): RelationMappings {
    return {
      surveys: {
        relation: Model.HasManyRelation,
        modelClass: SurveyModel,
        join: {
          from: `${DatabaseTableName.USERS}.id`,
          to: `${DatabaseTableName.SURVEYS}.user_id`,
        },
      },
    };
  }
}

export { UserModel };
