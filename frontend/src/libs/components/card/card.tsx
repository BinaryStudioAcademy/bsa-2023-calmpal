import { getValidClassNames } from '#libs/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
  title: string;
  onClick: () => void;
  isActive: boolean;
  imageUrl?: string;
};

const Card: React.FC<Properties> = ({ title, onClick, isActive, imageUrl }) => {
  return (
    <button
      className={getValidClassNames(
        styles['item'],
        isActive && styles['selected'],
      )}
      onClick={onClick}
    >
      <div
        className={getValidClassNames(
          styles['name'],
          !imageUrl && styles['no-image'],
        )}
      >
        {imageUrl && (
          <div className={styles['image-placeholder']}>
            <img src={imageUrl} alt="not found" className={styles['image']} />
          </div>
        )}
        {title}
      </div>
    </button>
  );
};

export { Card };
