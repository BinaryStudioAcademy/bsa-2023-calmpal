import { RootScreenName } from '#libs/enums/enums';
import { type NavigationItem } from '#libs/types/types';
import { Main } from '#navigations/navigations';
import { Auth } from '#screens/auth/auth';
import { Survey } from '#screens/survey/survey';

const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    name: RootScreenName.MAIN,
    component: Main,
    conditionToRender: (authenticatedUser, isSurveyCompleted): boolean => {
      return authenticatedUser && isSurveyCompleted;
    },
  },
  {
    name: RootScreenName.SURVEY,
    component: Survey,
    conditionToRender: (authenticatedUser, isSurveyCompleted): boolean => {
      return authenticatedUser && !isSurveyCompleted;
    },
  },
  {
    name: RootScreenName.SIGN_IN,
    component: Auth,
    conditionToRender: (authenticatedUser): boolean => {
      return !authenticatedUser;
    },
  },
  {
    name: RootScreenName.SIGN_UP,
    component: Auth,
    conditionToRender: (authenticatedUser): boolean => {
      return !authenticatedUser;
    },
  },
];

export { NAVIGATION_ITEMS };
