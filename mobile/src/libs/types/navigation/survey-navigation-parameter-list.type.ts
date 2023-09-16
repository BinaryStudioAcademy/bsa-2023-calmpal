import { type SurveyScreenName } from '#libs/enums/enums';

type SurveyNavigationParameterList = {
  [SurveyScreenName.PREFERENCE]: undefined | object;
  [SurveyScreenName.FEELING]: undefined | object;
  [SurveyScreenName.GOAL]: undefined | object;
  [SurveyScreenName.WORRIES]: undefined | object;
  [SurveyScreenName.MEDITATION_EXPERIENCE]: undefined | object;
  [SurveyScreenName.JOURNALING_EXPERIENCE]: undefined | object;
};

export { type SurveyNavigationParameterList };
