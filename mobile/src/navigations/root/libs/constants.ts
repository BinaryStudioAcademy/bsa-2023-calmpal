import { RootScreenName } from '#libs/enums/enums';
import { Main } from '#navigations/navigations';
import { Auth } from '#screens/auth/auth';
import { Survey } from '#screens/survey/survey';

const NAVIGATION_ITEMS = [
  {
    name: RootScreenName.MAIN,
    component: Main,
    conditionToRender: (
      authenticatedUser: boolean,
      isSurveyCompleted: boolean,
    ): boolean => {
      return authenticatedUser && isSurveyCompleted;
    },
  },
  {
    name: RootScreenName.SURVEY,
    component: Survey,
    conditionToRender: (
      authenticatedUser: boolean,
      isSurveyCompleted: boolean,
    ): boolean => {
      return authenticatedUser && !isSurveyCompleted;
    },
  },
  {
    name: RootScreenName.SIGN_IN,
    component: Auth,
    conditionToRender: (authenticatedUser: boolean): boolean => {
      return !authenticatedUser;
    },
  },
  {
    name: RootScreenName.SIGN_UP,
    component: Auth,
    conditionToRender: (authenticatedUser: boolean): boolean => {
      return !authenticatedUser;
    },
  },
];

export { NAVIGATION_ITEMS };
