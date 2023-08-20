import headerLogo from '#assets/img/header-logo.svg';
import { AppRoute } from '#libs/enums/app-route.enum.js';

import { Link } from '../components.js';
import styles from './header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Link to={AppRoute.ROOT}>
        <img src={headerLogo} width="40" alt="logo" />
      </Link>
      <nav className={styles.nav}>
        <Link className={styles.link} to={AppRoute.SIGN_IN}>
          Sing In
        </Link>
      </nav>
    </header>
  );
};

export { Header };
