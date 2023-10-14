import { APIPath } from '~/libs/enums/enums.js';
import {
  type APIHandlerOptions,
  type APIHandlerResponse,
  BaseController,
} from '~/libs/packages/controller/controller.js';
import { HTTPCode } from '~/libs/packages/http/http.js';
import { type Logger } from '~/libs/packages/logger/logger.js';
import { type FileUploadRequestDto } from '~/packages/files/files.js';
import { type UserAuthResponseDto } from '~/packages/users/users.js';

import { MeditationApiPath } from './libs/enums/enums.js';
import { type MeditationEntryCreateRequestDto } from './libs/types/types.js';
import { createMeditationEntryValidationSchema } from './libs/validation-schemas/validation-schemas.js';
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
 *          id:
 *            type: number
 *            format: number
 *            minimum: 1
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
 *      Error:
 *        type: object
 *        properties:
 *          message:
 *            type: string
 *          errorType:
 *            type: string
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
        body: createMeditationEntryValidationSchema,
      },
      handler: (options) => {
        return this.create(
          options as APIHandlerOptions<{
            body: MeditationEntryCreateRequestDto;
            fileBuffer: FileUploadRequestDto;
            user: UserAuthResponseDto;
          }>,
        );
      },
    });

    this.addRoute({
      path: MeditationApiPath.ROOT,
      method: 'GET',
      handler: (options) => {
        return this.getAll(
          options as APIHandlerOptions<{
            user: UserAuthResponseDto;
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
   *          multipart/form-data:
   *            schema:
   *              type: object
   *              required:
   *                - name
   *                - file
   *              properties:
   *                name:
   *                  type: string
   *                file:
   *                  type: string
   *                  format: binary
   *      security:
   *       - bearerAuth: []
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
   *        400:
   *          description: Bad request or Payload too large
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Error'
   *              examples:
   *                invalidFormat:
   *                  value:
   *                    message: "File extension should be one of PNG, JPEG, MPEG."
   *                    errorType: "FILE"
   *                fileSizeExceedsLimit:
   *                  value:
   *                    message: "The inputted file is bigger than 10 MB."
   *                    errorType: "FILE"
   */

  private async create(
    options: APIHandlerOptions<{
      body: MeditationEntryCreateRequestDto;
      fileBuffer: FileUploadRequestDto;
      user: UserAuthResponseDto;
    }>,
  ): Promise<APIHandlerResponse> {
    return {
      status: HTTPCode.CREATED,
      payload: await this.meditationService.create({
        name: options.body.name.value,
        file: options.fileBuffer,
        userId: options.user.id,
      }),
    };
  }

  /**
   * @swagger
   * /meditation:
   *    get:
   *      description: Get all meditation entries
   *      security:
   *       - bearerAuth: []
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  items:
   *                    type: array
   *                    items:
   *                      $ref: '#/components/schemas/MeditationEntry'
   */

  private async getAll(
    options: APIHandlerOptions<{
      user: UserAuthResponseDto;
    }>,
  ): Promise<APIHandlerResponse> {
    return {
      status: HTTPCode.OK,
      payload: await this.meditationService.findByUserId(options.user.id),
    };
  }
}

export { MeditationController };
