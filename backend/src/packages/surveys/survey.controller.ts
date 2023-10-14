import { APIPath } from '~/libs/enums/enums.js';
import {
  type APIHandlerOptions,
  type APIHandlerResponse,
  BaseController,
} from '~/libs/packages/controller/controller.js';
import { HTTPCode } from '~/libs/packages/http/http.js';
import { type Logger } from '~/libs/packages/logger/logger.js';
import { AuthApiPath } from '~/packages/auth/auth.js';

import { type SurveyRequestDto } from './libs/types/types.js';
import { createSurveyValidationSchema } from './libs/validation-schemas/validation-schemas.js';
import { type SurveyService } from './survey.service.js';

/**
 * @swagger
 * components:
 *    schemas:
 *      SurveyRequest:
 *        type: object
 *        properties:
 *          userId:
 *            type: number
 *            format: number
 *            minimum: 1
 *          preferences:
 *            type: array
 *            items:
 *              type: string
 *      SurveyResponse:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: number
 *            minimum: 1
 *          userId:
 *            type: number
 *            format: number
 *            minimum: 1
 *          preferences:
 *            type: array
 *            items:
 *              type: string
 *          createdAt:
 *             type: string
 *             format: date-time
 *          updatedAt:
 *             type: string
 *             format: date-time
 *      UnprocessableEntity:
 *        type: object
 *        properties:
 *          message:
 *            type: string
 *          errorType:
 *            type: string
 *          preferences:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                path:
 *                  type: array
 *                  items:
 *                    oneOf:
 *                      - type: string
 *                      - type: number
 *                message:
 *                  type: string
 */
class SurveyController extends BaseController {
  private surveyService: SurveyService;

  public constructor(logger: Logger, surveyService: SurveyService) {
    super(logger, APIPath.AUTH);

    this.surveyService = surveyService;

    this.addRoute({
      path: AuthApiPath.SIGN_UP_SURVEY,
      method: 'POST',
      validation: {
        body: createSurveyValidationSchema,
      },
      handler: (options) => {
        return this.create(
          options as APIHandlerOptions<{
            body: SurveyRequestDto;
          }>,
        );
      },
    });
  }

  /**
   * @swagger
   * /auth/sign-up/survey:
   *    post:
   *      description: Create a new survey
   *      requestBody:
   *        description: Survey data
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/SurveyRequest'
   *      security:
   *       - bearerAuth: []
   *      responses:
   *        201:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/SurveyResponse'
   *        422:
   *          description: Validation failed
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/UnprocessableEntity'
   */

  private async create(
    options: APIHandlerOptions<{
      body: SurveyRequestDto;
    }>,
  ): Promise<APIHandlerResponse> {
    return {
      status: HTTPCode.CREATED,
      payload: await this.surveyService.create(options.body),
    };
  }
}

export { SurveyController };
