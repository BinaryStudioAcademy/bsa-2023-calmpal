import { type SurveyScreenName } from '#libs/enums/enums';

type SurveyNavigationParameterList = {
  [SurveyScreenName.PREFERENCES]: undefined;
  [SurveyScreenName.FEELINGS]: undefined;
  [SurveyScreenName.GOALS]: undefined;
  [SurveyScreenName.WORRIES]: undefined;
  [SurveyScreenName.MEDITATION_EXPERIENCE]: undefined;
  [SurveyScreenName.JOURNALING_EXPERIENCE]: undefined;
};

export { type SurveyNavigationParameterList };
