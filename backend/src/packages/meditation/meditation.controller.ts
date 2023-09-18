import { APIPath } from '#libs/enums/enums.js';
import {
  type APIHandlerOptions,
  type APIHandlerResponse,
  BaseController,
} from '#libs/packages/controller/controller.js';
import { HTTPCode } from '#libs/packages/http/http.js';
import { type Logger } from '#libs/packages/logger/logger.js';
import { type FileUploadRequestDto } from '#packages/files/files.js';

import { MeditationApiPath } from './libs/enums/enums.js';
import { type MeditationEntryCreateRequestDto } from './libs/types/types.js';
import { createMeditationEntryRequestValidationSchema } from './libs/validation-schemas/validation-schemas.js';
import { type MeditationService } from './meditation.service.js';

/**
 * @swagger
 * components:
 *    schemas:
 *      MeditationEntryRequest:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *          file:
 *            type: string
 *            format: binary
 *      MeditationEntryResponse:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *          mediaUrl:
 *            type: string
 *            format: url
 *          contentType:
 *            type: string
 *          createdAt:
 *            type: string
 *            format: date-time
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
      validation: {
        body: createMeditationEntryRequestValidationSchema,
      },
      handler: (options) => {
        return this.create(
          options as APIHandlerOptions<{
            body: MeditationEntryCreateRequestDto;
            fileBuffer: FileUploadRequestDto;
          }>,
        );
      },
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
      body: MeditationEntryCreateRequestDto;
      fileBuffer: FileUploadRequestDto;
    }>,
  ): Promise<APIHandlerResponse> {
    return {
      status: HTTPCode.CREATED,
      payload: await this.meditationService.create({
        name: options.body.name.value,
        file: options.fileBuffer,
      }),
    };
  }
}

export { MeditationController };
