import { getValidClassNames } from '#libs/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
  title: string;
  imageUrl: string;
  onPress: () => void;
  isActive: boolean;
};

const Card: React.FC<Properties> = ({ title, imageUrl, onPress, isActive }) => {
  return (
    <button
      className={getValidClassNames(
        styles['item'],
        isActive && styles['selected'],
      )}
      onClick={onPress}
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
