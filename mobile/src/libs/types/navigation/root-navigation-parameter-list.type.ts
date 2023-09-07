import { type RootScreenName } from '#libs/enums/enums';

type RootNavigationParameterList = {
  [RootScreenName.MAIN]: undefined;
  [RootScreenName.SIGN_IN]: undefined;
  [RootScreenName.SIGN_UP]: undefined;
  [RootScreenName.SETTINGS]: undefined;
  [RootScreenName.MY_PROFILE]: undefined;
  [RootScreenName.SURVEY]: undefined;
};

export { type RootNavigationParameterList };
