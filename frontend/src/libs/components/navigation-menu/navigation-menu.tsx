import logoS from '#assets/img/logo-s.svg';
import { Icon, Link } from '#libs/components/components.js';
import { AppRoute, IconColor } from '#libs/enums/enums.js';
import {
  checkIsSelectedRoute,
  getValidClassNames,
} from '#libs/helpers/helpers.js';
import { useLocation, useParams } from '#libs/hooks/hooks.js';
import { type Route } from '#libs/types/types.js';

import styles from './styles.module.scss';

type Properties = {
  routes: Route[];
};

const NavigationMenu: React.FC<Properties> = ({ routes }) => {
  const { pathname } = useLocation();
  const routerParameters = useParams<Record<string, string>>();

  return (
    <div className={styles['nav-menu']}>
      <nav className={styles['nav']}>
        <Link to={AppRoute.ROOT}>
          <img src={logoS} alt="CalmPal logo" />
        </Link>
      </nav>
      <nav className={styles['nav']}>
        <div className={styles['icons-container']}>
          {routes.map((route) => {
            const isSelected = checkIsSelectedRoute({
              pathname,
              routerParameters,
              selectedRoute: route,
            });

            const { wrapPathWith, path, icon } = route;

            return (
              <button
                key={route.name}
                className={getValidClassNames(
                  styles['icon-container'],
                  isSelected && styles['icon-selected'],
                )}
              >
                <Link to={wrapPathWith?.(path) ?? path}>
                  <span className={styles['link']}>
                    <span className="visually-hidden">Go to {route.name}</span>
                    <Icon
                      name={icon}
                      color={IconColor.BLUE}
                      width={24}
                      height={24}
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

export { NavigationMenu };
