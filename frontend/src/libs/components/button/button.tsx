import { type IconColor } from '#libs/enums/icon-color.enum.js';
import { getValidClassNames } from '#libs/helpers/helpers.js';
import { type IconName, type ValueOf } from '#libs/types/types.js';

import { Icon } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
  label: string;
  type?: 'button' | 'submit';
  icon?: {
    name: IconName;
    color?: ValueOf<typeof IconColor>;
  };
  style?: 'primary' | 'secondary' | 'rounded' | 'rounded-transparent';
  isLoading?: boolean;
  isDisabled?: boolean;
  isLabelVisuallyHidden?: boolean;
  onClick?: () => void;
};

const Button: React.FC<Properties> = ({
  type = 'button',
  label,
  icon,
  style = 'primary',
  isLoading = false,
  isDisabled = false,
  isLabelVisuallyHidden = false,
  onClick,
}) => {
  return (
    <button
      type={type}
      className={styles[style]}
      onClick={onClick}
      disabled={isDisabled || isLoading}
    >
      {isLoading && <span className={styles['loader']} />}
      {icon && <Icon name={icon.name} color={icon.color} />}
      <span
        className={getValidClassNames(
          isLabelVisuallyHidden && 'visually-hidden',
        )}
      >
        {label}
      </span>
    </button>
  );
};

export { Button };
