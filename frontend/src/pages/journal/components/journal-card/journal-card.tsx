import { getValidClassNames } from '#libs/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
  title: string;
  onClick: () => void;
  isActive: boolean;
};

const JournalCard: React.FC<Properties> = ({ title, onClick, isActive }) => {
  return (
    <button
      className={getValidClassNames(
        styles['item'],
        isActive && styles['selected'],
      )}
      onClick={onClick}
    >
      <div className={styles['name']}>{title}</div>
    </button>
  );
};

export { JournalCard };
