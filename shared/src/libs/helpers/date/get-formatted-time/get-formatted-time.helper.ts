import { getFormattedDate } from '../get-formatted-date/get-formatted-date.helper.js';
import {
  MILLISECONDS_IN_SECOND,
  SECONDS_IN_MINUTE,
} from '../libs/constants/constants.js';
import { TimeFormat } from '../libs/enums/enums.js';

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
    hours ? TimeFormat.HH_MM_SS : TimeFormat.MM_SS,
  );
};

export { getFormattedTime };
