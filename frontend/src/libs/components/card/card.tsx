import { type AppRoute } from '#libs/enums/enums.js';
import { getValidClassNames } from '#libs/helpers/helpers.js';
import { type IconName, type ValueOf } from '#libs/types/types.js';

import { Icon, Link } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
  title: string;
  imageUrl?: string;
  onClick: () => void;
  isActive: boolean;
  iconName?: IconName;
  linkTo?: ValueOf<typeof AppRoute>;
};

const Card: React.FC<Properties> = ({
  title,
  imageUrl,
  onClick,
  isActive,
  iconName,
  linkTo,
}) => {
  return (
    <Link to={linkTo ?? '/'}>
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
    </Link>
  );
};

export { Card };
