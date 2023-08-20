import headerLogo from '#assets/img/logo.svg';
import { AppRoute } from '#libs/enums/enums.js';

import { Link } from '../components.js';
import styles from './styles.module.scss';

const Header: React.FC = () => {
  const { header, nav, link } = styles;
  return (
    <header className={header}>
      <Link to={AppRoute.ROOT}>
        <img src={headerLogo} width="45" alt="logo" />
      </Link>
      <nav className={nav}>
        <Link className={link} to={AppRoute.SIGN_IN}>
          Sign In
        </Link>
      </nav>
    </header>
  );
};

export { Header };
