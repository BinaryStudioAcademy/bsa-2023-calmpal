import { Button, Icon } from '#libs/components/components.js';
import { type IconColor } from '#libs/enums/enums.js';
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
  iconRight,
  onIconClick,
  iconColor,
}) => {
  const hasNoImageOrIcon = !imageUrl && !iconName;
  const hasImage = Boolean(imageUrl);
  const hasIcon = Boolean(iconName);
  const hasIconRight = Boolean(iconRight);

  return (
    <div className={styles['container']}>
      <button
        className={getValidClassNames(
          styles['item'],
          isActive && styles['selected'],
          hasNoImageOrIcon && styles['no-image'],
        )}
        onClick={onClick}
      >
        <div className={styles['item-info']}>
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
      {hasIconRight && (
        <Button
          label="delete chat"
          style="icon-right"
          isLabelVisuallyHidden
          onClick={onIconClick}
          iconName={iconRight}
          iconColor={iconColor}
          iconWidth={25}
          iconHeight={25}
        />
      )}
    </div>
  );
};

export { Card };
