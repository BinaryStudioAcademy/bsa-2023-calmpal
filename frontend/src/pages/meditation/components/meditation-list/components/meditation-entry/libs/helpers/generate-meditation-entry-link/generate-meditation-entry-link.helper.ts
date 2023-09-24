import { AppQueryStringKey, AppRoute } from '#libs/enums/enums.js';
import { getUrlWithQueryString } from '#libs/helpers/helpers.js';
import { type ValueOf } from '#libs/types/types.js';

type Parameters = {
  durationTimer: number;
  meditationEntryId: number;
};

const generateMeditationEntryLink = ({
  durationTimer,
  meditationEntryId,
}: Parameters): string => {
  const path = AppRoute.MEDITATION_$ID.replace(
    ':id',
    String(meditationEntryId),
  );

  return getUrlWithQueryString(path as ValueOf<typeof AppRoute>, {
    [AppQueryStringKey.DURATION_TIMER]: String(durationTimer),
  });
};

export { generateMeditationEntryLink };
