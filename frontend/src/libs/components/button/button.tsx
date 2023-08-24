import { getValidClassNames } from '#libs/helpers/get-valid-class-names.js';

import styles from './styles.module.scss';

type Properties = {
  label: string;
  type?: 'button' | 'submit';
  className?: string;
  onClick?: (event: React.MouseEvent) => void;
};

const Button: React.FC<Properties> = ({
  type = 'button',
  label,
  className = '',
  onClick,
}) => (
  <button
    type={type}
    className={getValidClassNames(styles['btn'], className)}
    onClick={onClick}
  >
    {label}
  </button>
);

export { Button };
