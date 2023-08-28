import home from '#assets/img/home.svg';
import reactLogo from '#assets/img/react.svg';
import user from '#assets/img/user.svg';
import {
  Header,
  Link,
  Loader,
  RouterOutlet,
} from '#libs/components/components.js';
import { AppRoute, DataStatus } from '#libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useLocation,
} from '#libs/hooks/hooks.js';
import { actions as authActions } from '#slices/auth/auth.js';
import { actions as userActions } from '#slices/users/users.js';

import { Sidebar } from '../sidebar/sidebar.js';
import styles from './styles.module.scss';

const App: React.FC = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { authenticatedUserDataStatus } = useAppSelector(({ auth }) => ({
    authenticatedUserDataStatus: auth.authenticatedUserDataStatus,
  }));

  const isRoot = pathname === AppRoute.ROOT;

  useEffect(() => {
    if (isRoot) {
      void dispatch(userActions.loadAll());
    }
  }, [isRoot, dispatch]);

  useEffect(() => {
    void dispatch(authActions.getAuthenticatedUser());
  }, [dispatch]);

  if (authenticatedUserDataStatus === DataStatus.PENDING) {
    return <Loader />;
  }

  return (
    <div className={styles['app-container']}>
      <Sidebar
        routes={[
          { path: AppRoute.ROOT, name: 'home', icon: home },
          { path: AppRoute.SIGN_IN, name: 'sign-in', icon: home },
          { path: AppRoute.SIGN_UP, name: 'sign-up', icon: home },
          { path: AppRoute.USER_PROFILE, name: 'user-profile', icon: user },
        ]}
      />
      <div className={styles['body-container']}>
        <Header />
        <img src={reactLogo} className="App-logo" width="30" alt="logo" />

        <ul className="App-navigation-list">
          <li>
            <Link to={AppRoute.ROOT}>Root</Link>
          </li>
          <li>
            <Link to={AppRoute.SIGN_IN}>Sign in</Link>
          </li>
          <li>
            <Link to={AppRoute.SIGN_UP}>Sign up</Link>
          </li>
        </ul>
        <p>Current path: {pathname}</p>

        <div>
          <RouterOutlet />
        </div>
      </div>
    </div>
  );
};

export { App };
