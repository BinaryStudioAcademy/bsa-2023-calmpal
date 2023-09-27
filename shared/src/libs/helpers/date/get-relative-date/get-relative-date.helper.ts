import { differenceInCalendarDays, format } from 'date-fns';

import { DaysDifference, TimeFormat } from '../libs/enums/enums.js';

const getRelativeDate = (date: Date): string => {
  const daysDifference = differenceInCalendarDays(date, new Date());

  if (daysDifference === DaysDifference.TODAY) {
    return 'Today';
  }

  if (daysDifference === DaysDifference.YESTERDAY) {
    return 'Yesterday';
  }

  return format(date, TimeFormat.D_MMMM_YYYY);
};

export { getRelativeDate };
