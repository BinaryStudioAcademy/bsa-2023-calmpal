type SurveyInputDto = {
  preferences: string[];
  other: string;
};

type SurveyRequestDto = {
  preferences: string[];
  userId: number;
};

export { type SurveyInputDto, type SurveyRequestDto };
export { SURVEY_OTHER_CATEGORY } from './libs/constants/constants';
export { getSurveyCategories } from './libs/helpers/helpers';
export { type SurveyGetAllItemResponseDto } from './libs/types/types';
export { surveyInputValidationSchema } from './libs/validation-shemas/validation-schemas';
