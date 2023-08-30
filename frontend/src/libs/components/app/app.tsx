import home from '#assets/img/home.svg';
import { Loader, RouterOutlet, Sidebar } from '#libs/components/components.js';
import { AppRoute, DataStatus } from '#libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useLocation,
} from '#libs/hooks/hooks.js';
import { actions as authActions } from '#slices/auth/auth.js';

import styles from './styles.module.scss';

const App: React.FC = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { authenticatedUserDataStatus } = useAppSelector(({ auth }) => ({
    authenticatedUserDataStatus: auth.authenticatedUserDataStatus,
  }));

  useEffect(() => {
    void dispatch(authActions.getAuthenticatedUser());
  }, [dispatch]);

  const displaySidebar =
    pathname !== AppRoute.SIGN_IN && pathname !== AppRoute.SIGN_UP;

  if (authenticatedUserDataStatus === DataStatus.PENDING) {
    return <Loader />;
  }

  return (
    <div className={styles['app-container']}>
      {displaySidebar && (
        <Sidebar routes={[{ path: AppRoute.ROOT, name: 'home', icon: home }]} />
      )}
      <div className={styles['body-container']}>
        <RouterOutlet />
      </div>
    </div>
  );
};

export { App };
