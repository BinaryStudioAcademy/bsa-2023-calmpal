import { format } from 'date-fns';

const START_POINT = 0;

const TIME_FORMATS = {
  MM_SS: 'mm:ss',
  HH_MM_SS: 'hh:mm:ss',
};

const getFormattedTime = (timeInSeconds: number): string => {
  const date = new Date(START_POINT);
  date.setHours(START_POINT);

  date.setSeconds(timeInSeconds);
  const hasHours = date.getHours();

  return format(date, hasHours ? TIME_FORMATS.HH_MM_SS : TIME_FORMATS.MM_SS);
};

export { getFormattedTime };
