import { type MeditationScreenName } from '#libs/enums/enums';

type MeditationNavigationParameterList = {
  [MeditationScreenName.MEDITATION_TOPICS]: undefined;
  [MeditationScreenName.MEDITATION_LIST]: { title: string };
};

export { type MeditationNavigationParameterList };
