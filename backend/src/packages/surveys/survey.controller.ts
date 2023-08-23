import { APIPath } from '#libs/enums/enums.js';
import {
  type APIHandlerOptions,
  type APIHandlerResponse,
  BaseController,
} from '#libs/packages/controller/controller.js';
import { HTTPCode } from '#libs/packages/http/http.js';
import { type Logger } from '#libs/packages/logger/logger.js';
import { AuthApiPath } from '#packages/auth/libs/enums/enums.js';

import { type SurveyService } from './survey.service.js';
import { type SurveyRequestDto } from './surveys.js';

class SurveyController extends BaseController {
  private surveyService: SurveyService;

  public constructor(logger: Logger, surveyService: SurveyService) {
    super(logger, APIPath.AUTH);

    this.surveyService = surveyService;

    this.addRoute({
      path: AuthApiPath.SURVEY,
      method: 'POST',
      handler: (options) =>
        this.create(
          options as APIHandlerOptions<{
            body: SurveyRequestDto;
          }>,
        ),
    });
  }

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
