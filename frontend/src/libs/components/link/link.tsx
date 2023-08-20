import { NavLink } from 'react-router-dom';

import { type AppRoute } from '#libs/enums/enums.js';
import { mergeStyles } from '#libs/helpers/helpers.js';
import { type ValueOf } from '#libs/types/types.js';

import styles from './styles.module.scss';

type Properties = {
  to: ValueOf<typeof AppRoute>;
  children: React.ReactNode;
  className?: string | undefined;
};

const Link: React.FC<Properties> = ({
  children,
  to,
  className = '',
}: Properties) => {
  const { link } = styles;
  const mergedStyles = mergeStyles(className, link);
  return (
    <NavLink className={mergedStyles} to={to}>
      {children}
    </NavLink>
  );
};

export { Link };
