import { NavigationMenu } from '~/libs/components/components.js';

import { SIDEBAR_ROUTES } from './libs/constants/constants.js';
import styles from './styles.module.scss';

type Properties = {
  children: React.ReactNode;
};

const NavigationMenuWrapper: React.FC<Properties> = ({ children }) => {
  return (
    <div className={styles['app']}>
      <NavigationMenu routes={SIDEBAR_ROUTES} />
      <div className={styles['body']}>{children}</div>
    </div>
  );
};

export { NavigationMenuWrapper };
