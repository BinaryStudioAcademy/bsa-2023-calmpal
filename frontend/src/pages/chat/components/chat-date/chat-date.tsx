import { DAY_DIFFERENCE_FROM_YESTERDAY } from '#pages/chat/libs/constants/constants.js';

import styles from './styles.module.scss';

type Properties = {
  date: string;
};

const ChatDate: React.FC<Properties> = ({ date }) => {
  const dateToday = new Date().toDateString();
  const dateYesteday = new Date(
    new Date().setDate(new Date().getDate() - DAY_DIFFERENCE_FROM_YESTERDAY),
  ).toDateString();

  let relativeDate;
  if (date === dateToday) {
    relativeDate = 'Today';
  } else if (date === dateYesteday) {
    relativeDate = 'Yesterday';
  } else {
    const datetime = new Date(date);
    const month = datetime.toLocaleString('en-EN', { month: 'long' });
    const day = datetime.getDate();
    const year = datetime.getFullYear();

    relativeDate = `${day} ${month} ${year}`;
  }

  return <div className={styles['date']}>{relativeDate}</div>;
};

export { ChatDate };
