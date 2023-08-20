import { NavLink } from 'react-router-dom';

import { type AppRoute } from '#libs/enums/enums.js';
import { type ValueOf } from '#libs/types/types.js';

import styles from './link.module.scss';

type Properties = {
  to: ValueOf<typeof AppRoute>;
  children: React.ReactNode;
  className?: string;
};

const stylePatcher = (newStyle: string): string => `${styles.link} ${newStyle}`;

const Link: React.FC<Properties> = ({
  children,
  to,
  className = '',
}: Properties) => (
  <NavLink className={stylePatcher(className)} to={to}>
    {children}
  </NavLink>
);

export { Link };
