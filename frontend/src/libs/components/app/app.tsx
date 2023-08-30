import { Loader, RouterOutlet } from '#libs/components/components.js';
import { DataStatus } from '#libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
} from '#libs/hooks/hooks.js';
import { actions as authActions } from '#slices/auth/auth.js';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { authenticatedUserDataStatus, surveyPreferencesDataStatus } =
    useAppSelector(({ auth }) => ({
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

  return <RouterOutlet />;
};

export { App };
