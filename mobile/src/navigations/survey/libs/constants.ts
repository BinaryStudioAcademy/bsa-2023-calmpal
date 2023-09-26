import { SurveyScreenName } from '#libs/enums/enums';
import { type SurveyNavigationItem } from '#libs/types/types';
import {
  JournalingStep,
  PreferencesStep,
} from '#screens/survey/components/components';

const SURVEY_NAVIGATION_ITEMS: SurveyNavigationItem[] = [
  {
    name: SurveyScreenName.PREFERENCES,
    component: PreferencesStep,
  },
  {
    name: SurveyScreenName.JOURNALING_EXPERIENCE,
    component: JournalingStep,
  },
];

export { SURVEY_NAVIGATION_ITEMS };
