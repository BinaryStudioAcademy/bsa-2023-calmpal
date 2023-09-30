import Stripe from 'stripe';

import {
  CURRENCY,
  SMALLEST_CURRENCY_UNIT_MULTIPLIER,
} from './constants/constants.js';

type Constructor = {
  secretKey: string;
};

class Billing {
  private secretKey: string;

  private stripe: Stripe;

  public constructor({ secretKey }: Constructor) {
    this.secretKey = secretKey;
    this.stripe = new Stripe(this.secretKey, {
      apiVersion: '2023-08-16',
    });
  }

  public async createPaymentIntent({
    price,
  }: {
    price: number;
  }): Promise<{ clientSecret: string; id: string }> {
    const { client_secret: clientSecret, id } =
      await this.stripe.paymentIntents.create({
        amount: this.getPriceInSmallestUnit(price),
        currency: CURRENCY,
      });

    return { id, clientSecret: clientSecret as string };
  }

  public async cancelPaymentIntent(id: string): Promise<boolean> {
    const { status } = await this.stripe.paymentIntents.cancel(id);

    return status === 'canceled';
  }

  private getPriceInSmallestUnit(amount: number): number {
    return amount * SMALLEST_CURRENCY_UNIT_MULTIPLIER;
  }
}

export { Billing };
