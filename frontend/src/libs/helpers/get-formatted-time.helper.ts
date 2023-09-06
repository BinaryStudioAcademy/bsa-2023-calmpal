import { format } from 'date-fns';

import { TIME_FORMAT } from '#libs/enums/enums.js';

const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;

const getFormattedDate = (date: Date, formatType: string): string => {
  return format(date, formatType);
};

const getFormattedTime = (seconds: number): string => {
  const timeZoneOffsetInMinutes = new Date().getTimezoneOffset();

  const timeZoneOffsetInMilliseconds =
    timeZoneOffsetInMinutes * SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND;
  const offset = new Date(
    seconds * MILLISECONDS_IN_SECOND + timeZoneOffsetInMilliseconds,
  );
  const hours = offset.getHours();

  return getFormattedDate(
    offset,
    hours ? TIME_FORMAT.HH_MM_SS : TIME_FORMAT.MM_SS,
  );
};

export { getFormattedTime };
