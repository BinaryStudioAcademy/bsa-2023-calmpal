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
      <div className={styles['name']}>
        <div className={styles['image-placeholder']}>
          {imageUrl && (
            <img src={imageUrl} alt="not found" className={styles['image']} />
          )}
          {iconName && <Icon name={iconName} />}
        </div>
        {title}
      </div>
    </button>
  );
};

export { Card };
