import { SECONDS_IN_MINUTE, TARGET_STRING_LENGTH } from './libs/constants';

const getFormattedTime = (time: number): string => {
  const minutes = Math.floor(time / SECONDS_IN_MINUTE);
  const formattedMinutes = minutes
    .toString()
    .padStart(TARGET_STRING_LENGTH, '0');
  const seconds = Math.floor(time % SECONDS_IN_MINUTE);
  const formattedSeconds = seconds
    .toString()
    .padStart(TARGET_STRING_LENGTH, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
};

export { getFormattedTime };
