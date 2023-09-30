import { addMonths } from 'date-fns';

const getShiftedDate = (
  baseDate: Date,
  { month }: { month?: number },
): Date => {
  let date = baseDate;
  if (month) {
    date = addMonths(date, month);
  }

  return date;
};

export { getShiftedDate };
