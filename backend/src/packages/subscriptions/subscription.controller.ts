import { APIPath } from '#libs/enums/enums.js';
import {
  type APIHandlerOptions,
  type APIHandlerResponse,
  BaseController,
} from '#libs/packages/controller/controller.js';
import { HTTPCode } from '#libs/packages/http/http.js';
import { type Logger } from '#libs/packages/logger/logger.js';

import { SubscriptionApiPath } from './libs/enums/enums.js';
import {
  type SubscriptionPaymentIntentCancelRequestDto,
  type SubscriptionPaymentIntentCreateRequestDto,
} from './libs/types/types.js';
import { type SubscriptionService } from './subscription.service.js';

class SubscriptionController extends BaseController {
  private subscriptionService: SubscriptionService;

  public constructor(logger: Logger, subscriptionService: SubscriptionService) {
    super(logger, APIPath.SUBSCRIPTION);

    this.subscriptionService = subscriptionService;

    this.addRoute({
      path: SubscriptionApiPath.PAYMENT_INTENT,
      method: 'POST',
      handler: (options) => {
        return this.createPaymentIntent(
          options as APIHandlerOptions<{
            body: SubscriptionPaymentIntentCreateRequestDto;
          }>,
        );
      },
    });

    this.addRoute({
      path: SubscriptionApiPath.PAYMENT_INTENT,
      method: 'DELETE',
      handler: (options) => {
        return this.cancelPaymentIntent(
          options as APIHandlerOptions<{
            body: SubscriptionPaymentIntentCancelRequestDto;
          }>,
        );
      },
    });
  }

  // TODO: add swagger documentation
  private async createPaymentIntent(
    options: APIHandlerOptions<{
      body: SubscriptionPaymentIntentCreateRequestDto;
    }>,
  ): Promise<APIHandlerResponse> {
    return {
      status: HTTPCode.CREATED,
      payload: await this.subscriptionService.createPaymentIntent({
        price: options.body.price,
      }),
    };
  }

  // TODO: add swagger documentation
  private async cancelPaymentIntent(
    options: APIHandlerOptions<{
      body: SubscriptionPaymentIntentCancelRequestDto;
    }>,
  ): Promise<APIHandlerResponse> {
    return {
      status: HTTPCode.OK,
      payload: await this.subscriptionService.cancelPaymentIntent(
        options.body.id,
      ),
    };
  }
}

export { SubscriptionController };
