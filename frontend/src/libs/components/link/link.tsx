import { NavLink } from 'react-router-dom';

import { type AppRoute } from '#libs/enums/enums.js';
import { type ValueOf } from '#libs/types/types.js';

import styles from './styles.module.scss';

type Properties = {
  to: ValueOf<typeof AppRoute> | `${ValueOf<typeof AppRoute>}?query=${string}`;
  children: React.ReactNode;
};

const Link: React.FC<Properties> = ({ children, to }) => {
  return (
    <NavLink className={styles['link'] as string} to={to}>
      {children}
    </NavLink>
  );
};

export { Link };
