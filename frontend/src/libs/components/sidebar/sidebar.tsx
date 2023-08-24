import logo from '#assets/img/logo.svg';
import { Link } from '#libs/components/components.js';
import { AppRoute } from '#libs/enums/enums.js';
import { getValidClassNames } from '#libs/helpers/helpers.js';
import { useLocation } from '#libs/hooks/hooks.js';
import { type ValueOf } from '#libs/types/types.js';

import styles from './styles.module.scss';

type Properties = {
  routes: {
    route: ValueOf<typeof AppRoute>;
    routeName: string;
    icon: string;
  }[];
};

const Sidebar: React.FC<Properties> = ({ routes }) => {
  const iconSelected = 'icon-selected';
  const iconStyles = 'icon-container';
  const { pathname } = useLocation();

  return (
    <div className={styles['sidebar']}>
      <nav className={styles['nav']}>
        <Link to={AppRoute.ROOT}>
          <span className={styles['image']}>
            <img src={logo} alt="logo" />
          </span>
        </Link>
      </nav>
      <nav className={styles['nav']}>
        <div className={styles['icons-container']}>
          {routes.map((route) => {
            return (
              <button
                key={route.routeName}
                className={getValidClassNames(
                  styles[iconStyles],
                  pathname === route.route && styles[iconSelected],
                )}
              >
                <Link to={route.route}>
                  <span>
                    <span className="visually-hidden">
                      Go to {route.routeName}
                    </span>
                    <img
                      src={route.icon}
                      alt={route.routeName}
                      className={styles['icon']}
                    />
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
