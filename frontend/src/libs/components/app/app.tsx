import { Loader, RouterOutlet } from '#libs/components/components.js';
import { AppRoute, DataStatus } from '#libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useLocation,
} from '#libs/hooks/hooks.js';
import { actions as authActions } from '#slices/auth/auth.js';
import { actions as surveyActions } from '#slices/survey/survey.js';
import { actions as userActions } from '#slices/users/users.js';

const App: React.FC = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const {
    authenticatedUserId,
    authenticatedUserDataStatus,
    surveyPreferencesDataStatus,
  } = useAppSelector(({ auth, survey }) => ({
    authenticatedUserId: auth.authenticatedUser?.id,
    authenticatedUserDataStatus: auth.authenticatedUserDataStatus,
    surveyPreferencesDataStatus: survey.dataStatus,
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

  useEffect(() => {
    if (authenticatedUserId) {
      void dispatch(
        surveyActions.getUserSurveyPreferences({ userId: authenticatedUserId }),
      );
    }
  }, [authenticatedUserId]);

  if (
    authenticatedUserDataStatus === DataStatus.PENDING ||
    surveyPreferencesDataStatus === DataStatus.PENDING
  ) {
    return <Loader />;
  }

  return <RouterOutlet />;
};

export { App };
