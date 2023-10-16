import { AppQueryStringKey, AppRoute } from '~/libs/enums/enums.js';
import { getUrlWithQueryString } from '~/libs/helpers/helpers.js';
import { type ValueOf } from '~/libs/types/types.js';

type Parameters = {
  timerDuration: number;
  meditationEntryId: number;
};

const generateMeditationEntryLink = ({
  timerDuration,
  meditationEntryId,
}: Parameters): string => {
  const path = AppRoute.MEDITATION_$ID.replace(
    ':id',
    String(meditationEntryId),
  );

  return getUrlWithQueryString(path as ValueOf<typeof AppRoute>, {
    [AppQueryStringKey.TIMER_DURATION]: String(timerDuration),
  });
};

export { generateMeditationEntryLink };
