import { format } from 'date-fns';

const getFormattedDate = (date: Date, formatType: string): string => {
  return format(date, formatType);
};

export { getFormattedDate };
