import { type MeditationScreenName } from '#libs/enums/enums';

import { type Track } from '../types';

type MeditationNavigationParameterList = {
  [MeditationScreenName.MEDITATION_MENU]: undefined;
  [MeditationScreenName.MEDITATION_LIST]: { title: string };
  [MeditationScreenName.MEDITATION]: { playlist: Track[] };
};

export { type MeditationNavigationParameterList };
