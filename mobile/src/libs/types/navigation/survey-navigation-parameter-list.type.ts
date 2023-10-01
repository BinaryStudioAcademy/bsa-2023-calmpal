import { type SurveyScreenName } from '#libs/enums/enums';

type SurveyNavigationParameterList = {
  [SurveyScreenName.PREFERENCES]: undefined | object;
  [SurveyScreenName.FEELINGS]: undefined | object;
  [SurveyScreenName.GOALS]: undefined | object;
  [SurveyScreenName.WORRIES]: undefined | object;
  [SurveyScreenName.MEDITATION_EXPERIENCE]: undefined | object;
  [SurveyScreenName.JOURNALING_EXPERIENCE]: undefined | object;
};

export { type SurveyNavigationParameterList };
