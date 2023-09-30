import { SURVEY_OTHER_CATEGORY } from '../constants/constants.js';

type SurveyInputDto = {
  preferences: string[];
  other: string;
};

const getSurveyCategories: (payload: SurveyInputDto) => string[] = (
  payload,
) => {
  const { preferences, other } = payload;

  return [
    ...new Set(
      preferences.map((category) => {
        return category === SURVEY_OTHER_CATEGORY ? other : category;
      }),
    ),
  ];
};

export { getSurveyCategories };
