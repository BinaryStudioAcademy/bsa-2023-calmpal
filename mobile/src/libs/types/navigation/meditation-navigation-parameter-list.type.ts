import { type MeditationScreenName } from '#libs/enums/enums';

type MeditationNavigationParameterList = {
  [MeditationScreenName.MEDITATION_MENU]: undefined;
  [MeditationScreenName.MEDITATION_LIST]: { title: string };
  [MeditationScreenName.MEDITATION]: undefined;
};

export { type MeditationNavigationParameterList };
