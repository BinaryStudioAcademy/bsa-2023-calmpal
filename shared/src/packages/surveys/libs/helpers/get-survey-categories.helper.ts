import { PREFERENCES_OTHER_CATEGORY } from '../constants/constants.js';
import { type SurveyMultipleInputDto } from '../types/types.js';

const getSurveyCategories: (payload: SurveyMultipleInputDto) => string[] = (
  payload,
) => {
  const { preferences, other } = payload;

  return [
    ...new Set(
      preferences.map((category) => {
        return category === PREFERENCES_OTHER_CATEGORY ? other : category;
      }),
    ),
  ];
};

export { getSurveyCategories };
