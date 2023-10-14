import { type Repository } from '~/libs/types/types.js';

import { type SubscriptionCommonQueryResponse } from './libs/types/types.js';
import { SubscriptionEntity } from './subscription.entity.js';
import { type SubscriptionModel } from './subscription.model.js';

class SubscriptionRepository implements Repository {
  private subscriptionModel: typeof SubscriptionModel;

  public constructor(subscriptionModel: typeof SubscriptionModel) {
    this.subscriptionModel = subscriptionModel;
  }

  public findById(): ReturnType<Repository['findById']> {
    return Promise.resolve(null);
  }

  public findAll(): ReturnType<Repository['findAll']> {
    return Promise.resolve([]);
  }

  public async create(entity: SubscriptionEntity): Promise<SubscriptionEntity> {
    const { endDate } = entity.toNewObject();

    const subscription = await this.subscriptionModel
      .query()
      .insertGraph({
        endDate: endDate.toISOString(),
      })
      .castTo<SubscriptionCommonQueryResponse>();

    return SubscriptionEntity.initialize({
      id: subscription.id,
      endDate: new Date(subscription.endDate),
      createdAt: new Date(subscription.createdAt),
      updatedAt: new Date(subscription.updatedAt),
    });
  }

  public update(): ReturnType<Repository['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<Repository['delete']> {
    const DELETED_COUNT = 0;

    return Promise.resolve(DELETED_COUNT);
  }
}

export { SubscriptionRepository };
