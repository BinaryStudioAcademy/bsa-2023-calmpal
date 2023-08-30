import { SurveyTextareaOptions } from '../enums/enums.js';
import { type SurveyInputDto } from '../types/types.js';

const getSurveyCategories: (payload: SurveyInputDto) => string[] = (
  payload,
) => {
  const { options, textarea } = payload;

  return [
    ...new Set(
      options.map((option) =>
        option === SurveyTextareaOptions.OTHER ? textarea : option,
      ),
    ),
  ];
};

export { getSurveyCategories };
