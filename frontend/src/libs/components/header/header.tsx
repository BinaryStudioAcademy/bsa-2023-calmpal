import '#assets/css/header.scss';

import headerLogo from '#assets/img/header-logo.svg';
import { AppRoute } from '#libs/enums/app-route.enum.js';

import { Link } from '../components.js';

const Header: React.FC = () => {
  return (
    <header className="navbar">
      <nav className="navbar-content">
        <img src={headerLogo} className="App-logo" width="40" alt="logo" />

        <Link className="nav-link" to={AppRoute.SIGN_IN}>
          Sing In
        </Link>
      </nav>
    </header>
  );
};

export { Header };
