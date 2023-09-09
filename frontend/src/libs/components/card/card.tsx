import { type IconColor } from '#libs/enums/enums.js';
import { getValidClassNames } from '#libs/helpers/helpers.js';
import { type IconName, type ValueOf } from '#libs/types/types.js';

import { Icon } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
  title: string;
  imageUrl?: string;
  onClick: () => void;
  isActive: boolean;
  iconName?: IconName;
  iconColor?: ValueOf<typeof IconColor>;
};

const Card: React.FC<Properties> = ({
  title,
  imageUrl,
  onClick,
  isActive,
  iconName,
  iconColor = 'currentColor',
}) => {
  return (
    <button
      className={getValidClassNames(
        styles['item'],
        isActive && styles['selected'],
      )}
      onClick={onClick}
    >
      <div className={getValidClassNames(styles['name'])}>
        {imageUrl && (
          <div className={styles['image-placeholder']}>
            <img src={imageUrl} alt="not found" className={styles['image']} />
          </div>
        )}
        {iconName && (
          <div className={styles['icon-background']}>
            <Icon name={iconName} color={iconColor} />
          </div>
        )}
        {title}
      </div>
    </button>
  );
};

export { Card };
