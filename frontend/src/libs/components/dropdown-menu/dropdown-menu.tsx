import { Icon, Link } from '~/libs/components/components.js';
import { IconColor } from '~/libs/enums/enums.js';
import {
  checkIsSelectedRoute,
  getValidClassNames,
} from '~/libs/helpers/helpers.js';
import {
  useCallback,
  useLocation,
  useParams,
  useState,
} from '~/libs/hooks/hooks.js';
import { type Route } from '~/libs/types/types.js';

import styles from './styles.module.scss';

type Properties = {
  routes: Route[];
};

const DropdownMenu: React.FC<Properties> = ({ routes }) => {
  const { pathname } = useLocation();
  const routerParameters = useParams();
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
          const isSelected = checkIsSelectedRoute({
            pathname,
            routerParameters,
            selectedRoute: item,
          });

          const { wrapPathWith, path, icon } = item;

          return (
            <div key={path}>
              <div className={styles['dropdown-item']}>
                <Link to={wrapPathWith?.(path) ?? path}>
                  <span
                    className={getValidClassNames(
                      styles['item'],
                      isSelected && styles['selected'],
                    )}
                  >
                    <span className="visually-hidden">Go to {item.name}</span>
                    <Icon
                      name={icon}
                      color={IconColor.BLUE}
                      width={24}
                      height={24}
                    />
                    <span className={styles['title']}>{item.name}</span>
                  </span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { DropdownMenu };
