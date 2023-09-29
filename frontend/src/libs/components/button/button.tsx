import { type IconColor } from '#libs/enums/enums.js';
import { getValidClassNames } from '#libs/helpers/helpers.js';
import {
  type ButtonStyle,
  type ButtonStyleColor,
  type IconName,
  type ValueOf,
} from '#libs/types/types.js';

import { Icon } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
  label: string;
  type?: 'button' | 'submit';
  iconName?: IconName | undefined;
  iconColor?: ValueOf<typeof IconColor> | undefined;
  iconWidth?: number;
  iconHeight?: number;
  style?: ButtonStyle;
  styleColor?: ButtonStyleColor;
  isLoading?: boolean;
  isDisabled?: boolean;
  isLabelVisuallyHidden?: boolean;
  onClick?:
    | ((event_: React.MouseEvent) => void)
    | ((event_: React.MouseEvent) => Promise<void>)
    | undefined;
};

const Button: React.FC<Properties> = ({
  type = 'button',
  label,
  iconName,
  iconColor,
  iconWidth,
  iconHeight,
  style = 'primary',
  styleColor = 'default',
  isLoading = false,
  isDisabled = false,
  isLabelVisuallyHidden = false,
  onClick,
}) => {
  return (
    <button
      type={type}
      className={getValidClassNames(styles[style], styles[styleColor])}
      onClick={onClick}
      disabled={isDisabled || isLoading}
    >
      {isLoading && <span className={styles['loader']} />}
      {iconName && (
        <Icon
          name={iconName}
          color={iconColor}
          width={iconWidth}
          height={iconHeight}
        />
      )}
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
