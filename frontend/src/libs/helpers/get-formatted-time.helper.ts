import { format } from 'date-fns';

const EPOCH_MILLISECONDS = 0;
const TIME_FORMAT = 'mm:ss';

const getFormattedTime = (time: number): string => {
  const timeDate = new Date(EPOCH_MILLISECONDS);
  timeDate.setSeconds(time);

  return format(timeDate, TIME_FORMAT);
};

export { getFormattedTime };
