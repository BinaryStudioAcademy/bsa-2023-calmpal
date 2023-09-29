import { DropdownMenu } from '#libs/components/components.js';
import { SIDEBAR_ROUTES as routes } from '#libs/components/navigation-menu-wrapper/libs/constants/constants.js';

import styles from './styles.module.scss';

type Properties = {
  children: React.ReactNode;
};

const SidebarHeader: React.FC<Properties> = ({ children }) => {
  return (
    <div className={styles['header']}>
      {children}
      <DropdownMenu routes={routes} />
    </div>
  );
};

export { SidebarHeader };
