import { type Billing } from '#libs/packages/billing/billing.js';
import { type Service } from '#libs/types/types.js';
import {
  type UserAuthResponseDto,
  userService,
} from '#packages/users/users.js';

import {
  type SubscriptionPaymentIntentCreateRequestDto,
  type SubscriptionPaymentIntentCreateResponseDto,
} from './libs/types/types.js';
import { SubscriptionEntity } from './subscription.entity.js';
import { type SubscriptionRepository } from './subscription.repository.js';

type Constructor = {
  billing: Billing;
  subscriptionRepository: SubscriptionRepository;
};

class SubscriptionService implements Service {
  private billing: Billing;

  private subscriptionRepository: SubscriptionRepository;

  public constructor({ billing, subscriptionRepository }: Constructor) {
    this.billing = billing;
    this.subscriptionRepository = subscriptionRepository;
  }

  public find(): Promise<unknown> {
    return Promise.resolve();
  }

  public findAll(): Promise<{ items: unknown[] }> {
    return Promise.resolve({ items: [] });
  }

  public create(): Promise<unknown> {
    return Promise.resolve();
  }

  public async subscribe({
    userId,
  }: {
    userId: number;
  }): Promise<UserAuthResponseDto> {
    const subscriptionEntity = await this.subscriptionRepository.create(
      SubscriptionEntity.initializeNew({
        endDate: new Date(),
      }),
    );

    const { id } = subscriptionEntity.toObject();

    return await userService.updateSubscription({
      id: userId,
      subscriptionId: id,
    });
  }

  public async createPaymentIntent({
    price,
  }: SubscriptionPaymentIntentCreateRequestDto): Promise<SubscriptionPaymentIntentCreateResponseDto> {
    const { clientSecret, id } = await this.billing.createPaymentIntent({
      price,
    });

    return { clientSecret, id };
  }

  public cancelPaymentIntent(id: string): Promise<boolean> {
    return this.billing.cancelPaymentIntent(id);
  }

  public update(): Promise<unknown> {
    return Promise.resolve();
  }

  public delete(): Promise<boolean> {
    return Promise.resolve(true);
  }
}

export { SubscriptionService };
