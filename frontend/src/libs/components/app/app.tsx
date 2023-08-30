import home from '#assets/img/home.svg';
import {
  Header,
  Loader,
  Navigate,
  RouterOutlet,
  Sidebar,
} from '#libs/components/components.js';
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
  const {
    authenticatedUser,
    authenticatedUserDataStatus,
    surveyPreferencesDataStatus,
  } = useAppSelector(({ auth }) => ({
    authenticatedUser: auth.authenticatedUser,
    authenticatedUserDataStatus: auth.authenticatedUserDataStatus,
    surveyPreferencesDataStatus: auth.surveyPreferencesDataStatus,
  }));

  useEffect(() => {
    void dispatch(authActions.getAuthenticatedUser());
  }, [dispatch]);

  if (
    authenticatedUserDataStatus === DataStatus.IDLE ||
    authenticatedUserDataStatus === DataStatus.PENDING ||
    surveyPreferencesDataStatus === DataStatus.PENDING
  ) {
    return <Loader />;
  }

  const hasNoSurvey =
    authenticatedUser &&
    !authenticatedUser.isSurveyCompleted &&
    pathname !== AppRoute.SURVEY;
  if (hasNoSurvey) {
    return <Navigate to={AppRoute.SURVEY} />;
  }

  return (
    <div className={styles['app-container']}>
      <Sidebar routes={[{ path: AppRoute.ROOT, name: 'home', icon: home }]} />
      <div className={styles['body-container']}>
        <Header />
        <div>
          <RouterOutlet />
        </div>
      </div>
    </div>
  );
};

export { App };
