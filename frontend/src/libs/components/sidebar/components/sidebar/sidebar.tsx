import { getValidClassNames } from '#libs/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
  children: React.ReactNode;
  isSidebarShown?: boolean;
};

const Sidebar: React.FC<Properties> = ({ children, isSidebarShown = true }) => {
  return (
    <div
      className={getValidClassNames(
        styles['container'],
        !isSidebarShown && styles['hide'],
      )}
    >
      {children}
    </div>
  );
};

export { Sidebar };
