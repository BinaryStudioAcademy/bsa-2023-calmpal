import { getValidClassNames } from '#libs/helpers/helpers.js';
import { type IconName } from '#libs/types/types.js';

import { Icon } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
  title: string;
  imageUrl?: string;
  onClick: () => void;
  isActive: boolean;
  iconName?: IconName;
};

const Card: React.FC<Properties> = ({
  title,
  imageUrl,
  onClick,
  isActive,
  iconName,
}) => {
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
        {iconName && (
          <div className={styles['image-placeholder']}>
            <Icon name={iconName} />
          </div>
        )}
        {title}
      </div>
    </button>
  );
};

export { Card };
