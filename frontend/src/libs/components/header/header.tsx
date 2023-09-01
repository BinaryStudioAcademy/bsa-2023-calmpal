import logo from '#assets/img/logo.svg';
import { DropdownMenu, Link } from '#libs/components/components.js';
import { AppRoute } from '#libs/enums/enums.js';
import { type Route } from '#libs/types/types.js';

import styles from './styles.module.scss';

type Properties = {
  routes: Route[];
};

const Header: React.FC<Properties> = ({ routes }) => {
  return (
    <header className={styles['header']}>
      <nav className={styles['nav']}>
        <Link to={AppRoute.ROOT}>
          <div className={styles['image']}>
            <img src={logo} alt="logo" />
          </div>
        </Link>
      </nav>
      <nav className={styles['nav']}>
        <Link to={AppRoute.SIGN_IN}>Sign In</Link>
        <DropdownMenu routes={routes} />
      </nav>
    </header>
  );
};

export { Header };
