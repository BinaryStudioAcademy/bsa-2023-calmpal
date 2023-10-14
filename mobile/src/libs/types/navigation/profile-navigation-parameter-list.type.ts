import { type ProfileScreenName } from '~/libs/enums/enums';

type ProfileNavigationParameterList = {
  [ProfileScreenName.SETTINGS]: undefined;
  [ProfileScreenName.PROFILE]: undefined;
};

export { type ProfileNavigationParameterList };
