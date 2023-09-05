import { APIPath } from '#libs/enums/enums.js';
import {
  type APIHandlerOptions,
  type APIHandlerResponse,
  BaseController,
} from '#libs/packages/controller/controller.js';
import { HTTPCode } from '#libs/packages/http/http.js';
import { type Logger } from '#libs/packages/logger/logger.js';

import { MeditationApiPath } from './libs/enums/enums.js';
import { type MeditationEntryRequestDto } from './libs/types/types.js';
import { type MeditationService } from './meditation.service.js';

/**
 * @swagger
 * components:
 *    schemas:
 *      MeditationEntryRequest:
 *        type: object
 *        properties:
 *          topicName:
 *            type: string
 *          audioUrl:
 *            type: string
 *            format: url
 *      MeditationEntryResponse:
 *        type: object
 *        properties:
 *          topicName:
 *            type: string
 *          audioUrl:
 *            type: string
 *            format: url
 *          createdAt:
 *            type: string
 *            format: date-tie
 *          updatedAt:
 *            type: string
 *            format: date-time
 */
class MeditationController extends BaseController {
  private meditationService: MeditationService;

  public constructor(logger: Logger, meditationService: MeditationService) {
    super(logger, APIPath.MEDITATION);

    this.meditationService = meditationService;

    this.addRoute({
      path: MeditationApiPath.ROOT,
      method: 'POST',
      handler: (options) =>
        this.create(
          options as APIHandlerOptions<{
            body: MeditationEntryRequestDto;
          }>,
        ),
    });
  }

  /**
   * @swagger
   * /meditation:
   *    post:
   *      description: Create a new meditation
   *      requestBody:
   *        description: Meditation data
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/MeditationEntryRequest'
   *      responses:
   *        201:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message:
   *                    $ref: '#/components/schemas/MeditationEntryResponse'
   */

  private async create(
    options: APIHandlerOptions<{
      body: MeditationEntryRequestDto;
    }>,
  ): Promise<APIHandlerResponse> {
    return {
      status: HTTPCode.CREATED,
      payload: await this.meditationService.create(options.body),
    };
  }
}

export { MeditationController };
