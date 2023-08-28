import { type SurveyInputDto } from '#packages/survey/survey';

const TEXTAREA_MAX_LENGTH = 1000;

const DEFAULT_SURVEY_PAYLOAD: SurveyInputDto = {
  options: [],
  textarea: '',
};

export { DEFAULT_SURVEY_PAYLOAD, TEXTAREA_MAX_LENGTH };
