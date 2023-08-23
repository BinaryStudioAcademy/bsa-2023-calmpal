import home from '#assets/img/home.svg';
import logo from '#assets/img/logo.svg';
import { Link } from '#libs/components/components.js';
import { AppRoute } from '#libs/enums/enums.js';
import { useLocation } from '#libs/hooks/hooks.js';

import styles from './styles.module.scss';

const Sidebar: React.FC = () => {
  const iconSelected = 'icon-selected';
  const iconStyles = 'icon-container';
  const { pathname } = useLocation();

  return (
    <div className={styles['sidebar']}>
      <nav className={styles['nav']}>
        <Link to={AppRoute.ROOT}>
          <div className={styles['image']}>
            <img src={logo} alt="logo" />
          </div>
        </Link>
      </nav>
      <nav className={styles['nav']}>
        <div className={styles['icons-container']}>
          <button
            className={`${
              pathname === AppRoute.ROOT
                ? styles[iconSelected]
                : styles[iconStyles]
            }`}
          >
            <Link to={AppRoute.ROOT}>
              <div>
                <img src={home} alt="home" className={styles['icon']} />
              </div>
            </Link>
          </button>
          <button
            className={`${
              pathname === AppRoute.SIGN_IN
                ? styles[iconSelected]
                : styles[iconStyles]
            }`}
          >
            <Link to={AppRoute.SIGN_IN}>
              <div>
                <img src={home} alt="home" className={styles['icon']} />
              </div>
            </Link>
          </button>
          <button
            className={`${
              pathname === AppRoute.SIGN_UP
                ? styles[iconSelected]
                : styles[iconStyles]
            }`}
          >
            <Link to={AppRoute.SIGN_UP}>
              <div>
                <img src={home} alt="home" className={styles['icon']} />
              </div>
            </Link>
          </button>
        </div>
      </nav>
    </div>
  );
};

export { Sidebar };
