import { getFormattedDate } from '../get-formatted-date/get-formatted-date.helper.js';
import {
  MILLISECONDS_IN_SECOND,
  NO_OFFSET_IN_MILLISECONDS,
  SECONDS_IN_MINUTE,
} from '../libs/constants/constants.js';
import { TimeFormat } from '../libs/enums/enums.js';

const getFormattedTime = (
  seconds: number,
  isTimeZoneIncluded = true,
): string => {
  const timeZoneOffsetInMinutes = new Date().getTimezoneOffset();
  const timeZoneOffsetInMilliseconds =
    timeZoneOffsetInMinutes * SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND;

  const offsetInMilliseconds = isTimeZoneIncluded
    ? timeZoneOffsetInMilliseconds
    : NO_OFFSET_IN_MILLISECONDS;

  const offset = new Date(
    seconds * MILLISECONDS_IN_SECOND + offsetInMilliseconds,
  );
  const hours = isTimeZoneIncluded ? offset.getHours() : offset.getUTCHours();

  return getFormattedDate(
    offset,
    hours ? TimeFormat.HH_MM_SS : TimeFormat.MM_SS,
  );
};

export { getFormattedTime };
