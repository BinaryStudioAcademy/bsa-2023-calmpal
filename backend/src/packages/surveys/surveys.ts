import { logger } from '~/libs/packages/logger/logger.js';

import { SurveyController } from './survey.controller.js';
import { SurveyModel } from './survey.model.js';
import { SurveyRepository } from './survey.repository.js';
import { SurveyService } from './survey.service.js';

const surveyRepository = new SurveyRepository(SurveyModel);
const surveyService = new SurveyService(surveyRepository);
const surveyController = new SurveyController(logger, surveyService);

export { surveyController, surveyService };
export {
  type SurveyGetAllItemResponseDto,
  type SurveyRequestDto,
} from './libs/types/types.js';
