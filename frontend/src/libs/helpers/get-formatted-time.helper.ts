const SECONDS_IN_MINUTE = 60;
const TARGET_STRING_LENGTH = 2;

const getFormattedTime = (time: number): string => {
  if (time && !Number.isNaN(time)) {
    const minutes = Math.floor(time / SECONDS_IN_MINUTE);
    const formattedMinutes = minutes
      .toString()
      .padStart(TARGET_STRING_LENGTH, '0');

    const seconds = Math.floor(time % SECONDS_IN_MINUTE);
    const formattedSeconds = seconds
      .toString()
      .padStart(TARGET_STRING_LENGTH, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  return '00:00';
};

export { getFormattedTime };
