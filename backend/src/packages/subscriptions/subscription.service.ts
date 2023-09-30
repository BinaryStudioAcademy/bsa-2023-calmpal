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

  public findById(): ReturnType<Service['findById']> {
    return Promise.resolve(null);
  }

  public findAll(): ReturnType<Service['findAll']> {
    return Promise.resolve({ items: [] });
  }

  public create(): ReturnType<Service['create']> {
    return Promise.resolve(null);
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

  public async cancelPaymentIntent(id: string): Promise<boolean> {
    return await this.billing.cancelPaymentIntent(id);
  }

  public update(): ReturnType<Service['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<Service['delete']> {
    return Promise.resolve(true);
  }
}

export { SubscriptionService };
