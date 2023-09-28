import { RootScreenName } from '#libs/enums/enums';
import { type NavigationItem } from '#libs/types/types';
import { Main, Survey, UserProfile } from '#navigations/navigations';
import { Auth } from '#screens/auth/auth';

const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    name: RootScreenName.MAIN,
    component: Main,
    checkShouldBeRendered: (authenticatedUser, isSurveyCompleted): boolean => {
      return authenticatedUser && isSurveyCompleted;
    },
  },
  {
    name: RootScreenName.SURVEY,
    component: Survey,
    checkShouldBeRendered: (authenticatedUser, isSurveyCompleted): boolean => {
      return authenticatedUser && !isSurveyCompleted;
    },
  },
  {
    name: RootScreenName.SIGN_IN,
    component: Auth,
    checkShouldBeRendered: (authenticatedUser): boolean => {
      return !authenticatedUser;
    },
  },
  {
    name: RootScreenName.SIGN_UP,
    component: Auth,
    checkShouldBeRendered: (authenticatedUser): boolean => {
      return !authenticatedUser;
    },
  },
  {
    name: RootScreenName.PROFILE,
    component: UserProfile,
    checkShouldBeRendered: (authenticatedUser, isSurveyCompleted): boolean => {
      return authenticatedUser && isSurveyCompleted;
    },
  },
];

export { NAVIGATION_ITEMS };
