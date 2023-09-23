type SurveyInputDto = {
  preferences: string[];
  other: string;
};

type SurveyRequestDto = {
  preferences: string[];
  userId: number;
};

export { type SurveyInputDto, type SurveyRequestDto };
export { PREFERENCES_OTHER_CATEGORY } from './libs/enums/enums';
export { getSurveyCategories } from './libs/helpers/helpers';
export { type SurveyGetAllItemResponseDto } from './libs/types/types';
export { surveyInputValidationSchema } from './libs/validation-shemas/validation-schemas';
