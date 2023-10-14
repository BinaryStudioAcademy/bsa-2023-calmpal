import { Model, type RelationMappings } from 'objection';

import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';
import {
  SubscriptionModel,
  SubscriptionsTableColumn,
} from '~/packages/subscriptions/subscriptions.js';
import { SurveysTableColumn } from '~/packages/surveys/libs/enums/enums.js';
import { SurveyModel } from '~/packages/surveys/survey.model.js';

import {
  UserDetailsTableColumn,
  UsersTableColumn,
} from './libs/enums/enums.js';
import { UserModel } from './user.model.js';

class UserDetailsModel extends AbstractModel {
  public fullName!: string;

  public isSurveyCompleted!: boolean;

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
          to: `${DatabaseTableName.USERS}.${UsersTableColumn.ID}`,
        },
      },
      surveys: {
        relation: Model.HasOneRelation,
        modelClass: SurveyModel,
        join: {
          from: `${DatabaseTableName.USERS}.${UserDetailsTableColumn.USER_ID}`,
          to: `${DatabaseTableName.SURVEYS}.${SurveysTableColumn.USER_ID}`,
        },
      },
      subscription: {
        relation: Model.HasOneRelation,
        modelClass: SubscriptionModel,
        join: {
          from: `${DatabaseTableName.USER_DETAILS}.${UserDetailsTableColumn.SUBSCRIPTION_ID}`,
          to: `${DatabaseTableName.SUBSCRIPTIONS}.${SubscriptionsTableColumn.ID}`,
        },
      },
    };
  }
}

export { UserDetailsModel };
