import { Link } from '#libs/components/components.js';
import { getValidClassNames } from '#libs/helpers/helpers.js';
import { useCallback, useLocation, useState } from '#libs/hooks/hooks.js';
import { type Routes } from '#libs/types/types.js';

import styles from './styles.module.scss';

const Dropdown: React.FC<Routes> = ({ routes }) => {
  const { pathname } = useLocation();
  const [isOpen, setOpen] = useState(false);

  const handleDropdownToggle = useCallback((): void => {
    setOpen(!isOpen);
  }, [isOpen]);

  return (
    <div className={styles['dropdown']}>
      <button
        className={styles['dropdown-header']}
        onClick={handleDropdownToggle}
      >
        <span className={styles['bar']} />
        <span className={styles['bar']} />
        <span className={styles['bar']} />
      </button>
      <div
        className={getValidClassNames(
          styles['dropdown-body'],
          isOpen && styles['open'],
        )}
      >
        {routes.map((item) => (
          <>
            <button
              key={item.path}
              className={styles['dropdown-item']}
              id={item.path}
            >
              <Link to={item.path}>
                <span className={styles['item']}>
                  <span className="visually-hidden">Go to {item.name}</span>
                  <img
                    src={item.icon}
                    alt={item.name}
                    className={getValidClassNames(
                      styles['icon'],
                      pathname === item.path && styles['icon-selected'],
                    )}
                  />
                  <span className={styles['title']}>{item.name}</span>
                </span>
              </Link>
            </button>
            <hr />
          </>
        ))}
      </div>
    </div>
  );
};

export { Dropdown };
