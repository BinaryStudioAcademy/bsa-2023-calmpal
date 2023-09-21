import { Icon, Link } from '#libs/components/components.js';
import { IconColor } from '#libs/enums/enums.js';
import { getValidClassNames } from '#libs/helpers/helpers.js';
import { useCallback, useLocation, useState } from '#libs/hooks/hooks.js';
import { type Route } from '#libs/types/types.js';

import styles from './styles.module.scss';

type Properties = {
  routes: Route[];
};

const DropdownMenu: React.FC<Properties> = ({ routes }) => {
  const { pathname } = useLocation();
  const [isOpen, setOpen] = useState(false);

  const handleDropdownToggle = useCallback((): void => {
    setOpen((previous) => {
      return !previous;
    });
  }, []);

  return (
    <div className={styles['dropdown']}>
      <button
        className={styles['dropdown-header']}
        onClick={handleDropdownToggle}
      >
        <span className={styles['container']} />
      </button>
      <div
        className={getValidClassNames(
          styles['dropdown-body'],
          isOpen && styles['open'],
        )}
      >
        {routes.map((item) => {
          return (
            <div key={item.path}>
              <div
                className={getValidClassNames(
                  styles['dropdown-item'],
                  pathname === item.path && styles['selected'],
                )}
              >
                <Link to={item.path}>
                  <span className={styles['item']}>
                    <span className="visually-hidden">Go to {item.name}</span>
                    <Icon
                      name={item.icon}
                      color={IconColor.BLUE}
                      width={24}
                      height={24}
                    />
                    <span className={styles['title']}>{item.name}</span>
                  </span>
                </Link>
              </div>
              <hr className={styles['divider']} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { DropdownMenu };
