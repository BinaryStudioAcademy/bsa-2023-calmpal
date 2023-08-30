import home from '#assets/img/home.svg';
import { Sidebar } from '#libs/components/components.js';
import { AppRoute } from '#libs/enums/enums.js';

import styles from './styles.module.scss';

type Properties = {
  children: React.ReactNode;
};

const SidebarWrapper: React.FC<Properties> = ({ children }) => {
  return (
    <div className={styles['app']}>
      <Sidebar routes={[{ path: AppRoute.ROOT, name: 'home', icon: home }]} />
      <div className={styles['body']}>{children}</div>
    </div>
  );
};

export { SidebarWrapper };
