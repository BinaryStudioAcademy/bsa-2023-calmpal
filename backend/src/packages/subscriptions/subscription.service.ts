import { type Billing } from '#libs/packages/billing/billing.js';
import { type Service } from '#libs/types/types.js';

import { type SubscriptionPaymentIntentCreateRequestDto } from './libs/types/types.js';

type Constructor = {
  billing: Billing;
};

class SubscriptionService implements Service {
  private billing: Billing;

  public constructor({ billing }: Constructor) {
    this.billing = billing;
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

  public async createPaymentIntent({
    price,
  }: SubscriptionPaymentIntentCreateRequestDto): Promise<{
    clientSecret: string | null;
  }> {
    const { clientSecret } = await this.billing.createPaymentIntent({ price });

    return { clientSecret };
  }

  public update(): Promise<unknown> {
    return Promise.resolve();
  }

  public delete(): Promise<boolean> {
    return Promise.resolve(true);
  }
}

export { SubscriptionService };
