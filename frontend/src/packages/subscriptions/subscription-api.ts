import { APIPath, ContentType } from '#libs/enums/enums.js';
import { BaseHttpApi } from '#libs/packages/api/api.js';
import { type HTTP } from '#libs/packages/http/http.js';
import { type Storage } from '#libs/packages/storage/storage.js';
import { type UserAuthResponseDto } from '#packages/users/users.js';

import { SubscriptionApiPath } from './libs/enums/enums.js';
import {
  type SubscriptionPaymentIntentCancelRequestDto,
  type SubscriptionPaymentIntentCreateRequestDto,
  type SubscriptionPaymentIntentCreateResponseDto,
} from './libs/types/types.js';

type Constructor = {
  baseUrl: string;
  http: HTTP;
  storage: Storage;
};

class SubscriptionApi extends BaseHttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: APIPath.SUBSCRIPTION, baseUrl, http, storage });
  }

  public async createPaymentIntent(
    payload: SubscriptionPaymentIntentCreateRequestDto,
  ): Promise<SubscriptionPaymentIntentCreateResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(SubscriptionApiPath.PAYMENT_INTENT, {}),
      {
        method: 'POST',
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: true,
      },
    );

    return await response.json<SubscriptionPaymentIntentCreateResponseDto>();
  }

  public async cancelPaymentIntent(
    payload: SubscriptionPaymentIntentCancelRequestDto,
  ): Promise<boolean> {
    const response = await this.load(
      this.getFullEndpoint(SubscriptionApiPath.PAYMENT_INTENT, {}),
      {
        method: 'DELETE',
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: true,
      },
    );

    return await response.json<boolean>();
  }

  public async subscribe(): Promise<UserAuthResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(SubscriptionApiPath.ROOT, {}),
      {
        method: 'POST',
        hasAuth: true,
      },
    );

    return await response.json<UserAuthResponseDto>();
  }
}

export { SubscriptionApi };
