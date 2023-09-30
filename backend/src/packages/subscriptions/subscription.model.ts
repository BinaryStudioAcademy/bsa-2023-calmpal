import { Model, type RelationMappings } from 'objection';

import {
  AbstractModel,
  DatabaseTableName,
} from '#libs/packages/database/database.js';
import {
  UserDetailsModel,
  UserDetailsTableColumn,
} from '#packages/users/users.js';

import { SubscriptionsTableColumn } from './libs/enums/enums.js';

class SubscriptionModel extends AbstractModel {
  public endDate!: string;

  public static override get tableName(): string {
    return DatabaseTableName.SUBSCRIPTIONS;
  }

  public static get relationMappings(): RelationMappings {
    return {
      details: {
        relation: Model.HasOneRelation,
        modelClass: UserDetailsModel,
        join: {
          from: `${DatabaseTableName.SUBSCRIPTIONS}.${SubscriptionsTableColumn.ID}`,
          to: `${DatabaseTableName.USER_DETAILS}.${UserDetailsTableColumn.SUBSCRIPTION_ID}`,
        },
      },
    };
  }
}

export { SubscriptionModel };
