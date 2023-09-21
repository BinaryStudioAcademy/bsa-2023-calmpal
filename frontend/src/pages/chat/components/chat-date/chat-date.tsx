import { getRelativeDate } from '#libs/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
  date: string;
};

const ChatDate: React.FC<Properties> = ({ date }) => {
  const relativeDate = getRelativeDate(new Date(date));

  return <div className={styles['date']}>{relativeDate}</div>;
};

export { ChatDate };
