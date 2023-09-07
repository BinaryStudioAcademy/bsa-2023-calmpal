import { type SurveyScreenName } from '#libs/enums/enums';

type SurveyNavigationParameterList = {
  [SurveyScreenName.PREFERENCE]: undefined;
  [SurveyScreenName.FEELING]: undefined;
  [SurveyScreenName.GOAL]: undefined;
  [SurveyScreenName.WORRIES]: undefined;
  [SurveyScreenName.MEDITATION_EXPERIENCE]: undefined;
  [SurveyScreenName.JOURNALING_EXPERIENCE]: undefined;
};

export { type SurveyNavigationParameterList };
