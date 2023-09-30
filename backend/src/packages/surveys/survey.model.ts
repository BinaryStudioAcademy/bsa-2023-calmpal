import { Model, type RelationMappings } from 'objection';

import {
  AbstractModel,
  DatabaseTableName,
} from '#libs/packages/database/database.js';
import { UserDetailsTableColumn } from '#packages/users/libs/enums/enums.js';
import { UserDetailsModel } from '#packages/users/user-details.model.js';

import { SurveysTableColumn } from './libs/enums/enums.js';

class SurveyModel extends AbstractModel {
  public userId!: number;

  public preferences!: string[];

  public feelings!: string[] | null;

  public goals!: string[] | null;

  public worries!: string[] | null;

  public meditationExperience!: string | null;

  public journalingExperience!: string | null;

  public static override get tableName(): string {
    return DatabaseTableName.SURVEYS;
  }

  public static get relationMappings(): RelationMappings {
    return {
      details: {
        relation: Model.HasOneRelation,
        modelClass: UserDetailsModel,
        join: {
          from: `${DatabaseTableName.SURVEYS}.${SurveysTableColumn.USER_ID}`,
          to: `${DatabaseTableName.USER_DETAILS}.${UserDetailsTableColumn.USER_ID}`,
        },
      },
    };
  }
}

export { SurveyModel };
