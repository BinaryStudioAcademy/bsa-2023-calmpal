const DAY_DIFFERENCE_FROM_YESTERDAY = 1;

const getRelativeDate = (datetime: Date): string => {
  const date = datetime.toDateString();
  const dateToday = new Date().toDateString();
  const dateYesteday = new Date(
    new Date().setDate(new Date().getDate() - DAY_DIFFERENCE_FROM_YESTERDAY),
  ).toDateString();

  if (date === dateToday) {
    return 'Today';
  } else if (date === dateYesteday) {
    return 'Yesterday';
  }

  const month = datetime.toLocaleString('en-EN', { month: 'long' });
  const day = datetime.getDate();
  const year = datetime.getFullYear();

  return `${day} ${month} ${year}`;
};

export { getRelativeDate };
