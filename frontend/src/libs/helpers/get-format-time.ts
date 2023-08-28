const SECONDS_NUMBER = 60;
const SECONDS = 10;

const formatTime = (time: number): string => {
  if (time && !Number.isNaN(time)) {
    const minutes = Math.floor(time / SECONDS_NUMBER);
    const formatMinutes = minutes < SECONDS ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(time % SECONDS_NUMBER);
    const formatSeconds = seconds < SECONDS ? `0${seconds}` : `${seconds}`;

    return `${formatMinutes}:${formatSeconds}`;
  }

  return '00:00';
};

export { formatTime };
