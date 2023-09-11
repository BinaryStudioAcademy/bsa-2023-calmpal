import { getValidClassNames } from '#libs/helpers/helpers.js';

import styles from './style.module.scss';

type Properties = {
  children: React.ReactNode;
  isSidebarShown?: boolean;
};

const Sidebar: React.FC<Properties> = ({ children, isSidebarShown }) => {
  return (
    <div
      className={getValidClassNames(
        styles['container'],
        isSidebarShown === false && styles['hide'],
      )}
    >
      {children}
    </div>
  );
};

export { Sidebar };
