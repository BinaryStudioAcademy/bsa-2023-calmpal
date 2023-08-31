import { Loader, Navigate, RouterOutlet } from '#libs/components/components.js';
import { AppRoute, DataStatus } from '#libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useLocation,
} from '#libs/hooks/hooks.js';
import { actions as authActions } from '#slices/auth/auth.js';

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

  const hasNoSurvey =
    authenticatedUser &&
    !authenticatedUser.isSurveyCompleted &&
    pathname !== AppRoute.SURVEY;
  if (hasNoSurvey) {
    return <Navigate to={AppRoute.SURVEY} />;
  }

  if (
    authenticatedUserDataStatus === DataStatus.IDLE ||
    authenticatedUserDataStatus === DataStatus.PENDING ||
    surveyPreferencesDataStatus === DataStatus.PENDING
  ) {
    return <Loader />;
  }

  return <RouterOutlet />;
};

export { App };
