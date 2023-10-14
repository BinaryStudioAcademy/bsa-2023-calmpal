import {
  Loader,
  Navigate,
  RouterOutlet,
} from '~/libs/components/components.js';
import { AppRoute, DataStatus } from '~/libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useLocation,
  useNavigate,
} from '~/libs/hooks/hooks.js';
import { actions as appActions } from '~/slices/app/app.js';
import { actions as authActions } from '~/slices/auth/auth.js';

const App: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { authenticatedUser, authenticatedUserDataStatus, redirectTo } =
    useAppSelector(({ auth, app }) => {
      return {
        authenticatedUser: auth.authenticatedUser,
        authenticatedUserDataStatus: auth.authenticatedUserDataStatus,
        redirectTo: app.redirectTo,
      };
    });

  useEffect(() => {
    void dispatch(authActions.getAuthenticatedUser());
  }, [dispatch]);

  useEffect(() => {
    if (redirectTo) {
      navigate(redirectTo);
      dispatch(appActions.navigate(null));
    }
  }, [dispatch, navigate, redirectTo]);

  const hasNoSurvey =
    authenticatedUser &&
    !authenticatedUser.isSurveyCompleted &&
    pathname !== AppRoute.SIGN_UP_SURVEY;

  if (hasNoSurvey) {
    return <Navigate to={AppRoute.SIGN_UP_SURVEY} />;
  }

  if (
    authenticatedUserDataStatus === DataStatus.PENDING ||
    authenticatedUserDataStatus === DataStatus.IDLE
  ) {
    return <Loader isOverflow />;
  }

  return <RouterOutlet />;
};

export { App };
