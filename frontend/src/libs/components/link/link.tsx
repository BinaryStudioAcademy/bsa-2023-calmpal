import { NavLink } from 'react-router-dom';

import { type AppRoute } from '#libs/enums/enums.js';
import { getValidClassNames } from '#libs/helpers/helpers.js';
import { type ValueOf } from '#libs/types/types.js';

import styles from './styles.module.scss';

type Properties = {
  to: ValueOf<typeof AppRoute>;
  children: React.ReactNode;
  className?: string;
};

const Link: React.FC<Properties> = ({ children, to, className = '' }) => {
  const classNames = getValidClassNames(className, styles['link']);
  return (
    <NavLink className={classNames} to={to}>
      {children}
    </NavLink>
  );
};

export { Link };
