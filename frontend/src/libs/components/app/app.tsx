import reactLogo from '#assets/img/react.svg';
import {
  Header,
  Link,
  ProfileSettingsSidebar,
  RouterOutlet,
} from '#libs/components/components.js';
import { AppRoute } from '#libs/enums/enums.js';
import { useAppDispatch, useEffect, useLocation } from '#libs/hooks/hooks.js';
import { actions as userActions } from '#slices/users/users.js';

const App: React.FC = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const isRoot = pathname === AppRoute.ROOT;

  useEffect(() => {
    if (isRoot) {
      void dispatch(userActions.loadAll());
    }
  }, [isRoot, dispatch]);

  return (
    <>
      <Header />
      <ProfileSettingsSidebar />
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
    </>
  );
};

export { App };
