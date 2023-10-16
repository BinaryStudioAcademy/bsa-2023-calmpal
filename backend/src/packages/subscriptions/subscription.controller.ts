import { APIPath } from '~/libs/enums/enums.js';
import {
  type APIHandlerOptions,
  type APIHandlerResponse,
  BaseController,
} from '~/libs/packages/controller/controller.js';
import { HTTPCode } from '~/libs/packages/http/http.js';
import { type Logger } from '~/libs/packages/logger/logger.js';
import { type UserAuthResponseDto } from '~/packages/users/users.js';

import { SubscriptionApiPath } from './libs/enums/enums.js';
import {
  type SubscriptionPaymentIntentCancelRequestDto,
  type SubscriptionPaymentIntentCreateRequestDto,
} from './libs/types/types.js';
import {
  cancelPaymentIntentValidationSchema,
  createPaymentIntentValidationSchema,
} from './libs/validation-schemas/validation-schemas.js';
import { type SubscriptionService } from './subscription.service.js';

class SubscriptionController extends BaseController {
  private subscriptionService: SubscriptionService;

  public constructor(logger: Logger, subscriptionService: SubscriptionService) {
    super(logger, APIPath.SUBSCRIPTION);

    this.subscriptionService = subscriptionService;

    this.addRoute({
      path: SubscriptionApiPath.ROOT,
      method: 'POST',
      handler: (options) => {
        return this.subscribe(
          options as APIHandlerOptions<{
            user: UserAuthResponseDto;
          }>,
        );
      },
    });

    this.addRoute({
      path: SubscriptionApiPath.PAYMENT_INTENT,
      method: 'POST',
      validation: {
        body: createPaymentIntentValidationSchema,
      },
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
      validation: {
        body: cancelPaymentIntentValidationSchema,
      },
      handler: (options) => {
        return this.cancelPaymentIntent(
          options as APIHandlerOptions<{
            body: SubscriptionPaymentIntentCancelRequestDto;
          }>,
        );
      },
    });
  }

  /**
   * @swagger
   * /subscription/create-payment-intent:
   *   post:
   *     description: Create a new payment intent
   *     security:
   *      - bearerAuth: []
   *     requestBody:
   *       description: Create payment intent data
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               price:
   *                 type: number
   *     responses:
   *       201:
   *         description: Successful operation
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                 clientSecret:
   *                   type: string
   */
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

  /**
   * @swagger
   * /subscription/payment-intent:
   *   delete:
   *     description: Cancel payment intent
   *     security:
   *      - bearerAuth: []
   *     requestBody:
   *       description: Cancel payment intent data
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               id:
   *                 type: string
   *     responses:
   *       200:
   *         description: Successful operation
   *         content:
   *           application/json:
   *             schema:
   *               type: boolean
   */
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

  /**
   * @swagger
   * /subscription:
   *   post:
   *     description: Create a new subscription
   *     security:
   *      - bearerAuth: []
   *     responses:
   *       201:
   *         description: Successful operation
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   */
  private async subscribe(
    options: APIHandlerOptions<{
      user: UserAuthResponseDto;
    }>,
  ): Promise<APIHandlerResponse> {
    return {
      status: HTTPCode.CREATED,
      payload: await this.subscriptionService.subscribe({
        userId: options.user.id,
      }),
    };
  }
}

export { SubscriptionController };
