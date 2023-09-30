import { OTHER_CATEGORY } from '../constants/constants.js';
import { type SurveyInputDto } from '../types/types.js';

const getSurveyCategories: (payload: SurveyInputDto) => string[] = (
  payload,
) => {
  const { preferences, other } = payload;

  return [
    ...new Set(
      preferences.map((category) => {
        return category === OTHER_CATEGORY ? other : category;
      }),
    ),
  ];
};

export { getSurveyCategories };
