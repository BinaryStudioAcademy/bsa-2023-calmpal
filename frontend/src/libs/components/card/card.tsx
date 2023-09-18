import { Icon } from '#libs/components/components.js';
import { IconColor } from '#libs/enums/enums.js';
import { getValidClassNames } from '#libs/helpers/helpers.js';
import { type IconName, type ValueOf } from '#libs/types/types.js';

import styles from './styles.module.scss';

type Properties = {
  title: string;
  imageUrl?: string;
  onClick: () => void;
  isActive?: boolean;
  iconName?: IconName;
  iconColor?: ValueOf<typeof IconColor>;
  iconRight?: IconName;
  onIconClick?: () => void;
};

const Card: React.FC<Properties> = ({
  title,
  imageUrl,
  onClick,
  isActive = false,
  iconName,
  iconColor,
  iconRight,
  onIconClick,
}) => {
  const hasNoImageOrIcon = !imageUrl && !iconName;
  const hasImage = Boolean(imageUrl);
  const hasIcon = Boolean(iconName);

  return (
    <>
      <button
        className={getValidClassNames(
          styles['item'],
          isActive && styles['selected'],
          hasNoImageOrIcon && styles['no-image'],
        )}
        onClick={onClick}
      >
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {!hasNoImageOrIcon && (
            <div className={styles['image-container']}>
              {hasImage && (
                <div className={styles['image-placeholder']}>
                  <img
                    src={imageUrl}
                    alt="not found"
                    className={styles['image']}
                  />
                </div>
              )}
              {hasIcon && (
                <div className={styles['icon-background']}>
                  <Icon name={iconName as IconName} color={iconColor} />
                </div>
              )}
            </div>
          )}
          <div className={styles['title']}>{title}</div>
        </div>
      </button>
      {iconRight && (
        <button className={styles['icon-right']} onClick={onIconClick}>
          <Icon name={iconRight} color={IconColor.LIGHT_BLUE} />
        </button>
      )}
    </>
  );
};

export { Card };
