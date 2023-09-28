import { SurveyScreenName } from '#libs/enums/enums';
import { type SurveyNavigationItem } from '#libs/types/types';
import {
  FeelingsStep,
  GoalsStep,
  JournalingStep,
  MeditationStep,
  PreferencesStep,
  WorriesStep,
} from '#screens/survey/components/components';

const SURVEY_NAVIGATION_ITEMS: SurveyNavigationItem[] = [
  {
    name: SurveyScreenName.PREFERENCES,
    component: PreferencesStep,
  },
  {
    name: SurveyScreenName.FEELINGS,
    component: FeelingsStep,
  },
  {
    name: SurveyScreenName.GOALS,
    component: GoalsStep,
  },
  {
    name: SurveyScreenName.WORRIES,
    component: WorriesStep,
  },
  {
    name: SurveyScreenName.MEDITATION_EXPERIENCE,
    component: MeditationStep,
  },
  {
    name: SurveyScreenName.JOURNALING_EXPERIENCE,
    component: JournalingStep,
  },
];

export { SURVEY_NAVIGATION_ITEMS };
