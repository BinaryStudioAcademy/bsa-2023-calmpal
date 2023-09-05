import { getValidClassNames } from '#libs/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
  title: string;
  imageUrl: string;
  onClick: () => void;
  isActive: boolean;
};

const Card: React.FC<Properties> = ({ title, imageUrl, onClick, isActive }) => {
  return (
    <button
      className={getValidClassNames(
        styles['item'],
        isActive && styles['selected'],
      )}
      onClick={onClick}
    >
      <div className={styles['name']}>
        <div className={styles['image-placeholder']}>
          <img src={imageUrl} alt="not found" className={styles['image']} />
        </div>
        {title}
      </div>
    </button>
  );
};

export { Card };
