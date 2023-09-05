import { Icon, Link } from '#libs/components/components.js';
import { AppRoute, IconColor } from '#libs/enums/enums.js';
import { getValidClassNames } from '#libs/helpers/helpers.js';
import { useLocation } from '#libs/hooks/hooks.js';
import { type Route } from '#libs/types/types.js';

import styles from './styles.module.scss';

type Properties = {
  routes: Route[];
};

const Sidebar: React.FC<Properties> = ({ routes }) => {
  const { pathname } = useLocation();

  return (
    <div className={styles['sidebar']}>
      <nav className={styles['nav']}>
        <Link to={AppRoute.ROOT}>
          <span className={styles['image']}>
            <Icon name="logo" color={IconColor.BLUE} />
          </span>
        </Link>
      </nav>
      <nav className={styles['nav']}>
        <div className={styles['icons-container']}>
          {routes.map((route) => {
            return (
              <button
                key={route.name}
                className={getValidClassNames(
                  styles['icon-container'],
                  pathname === route.path && styles['icon-selected'],
                )}
              >
                <Link className={styles['link'] as string} to={route.path}>
                  <span>
                    <span className="visually-hidden">Go to {route.name}</span>
                    <Icon name={route.icon} color={IconColor.BLUE} />
                  </span>
                </Link>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export { Sidebar };
