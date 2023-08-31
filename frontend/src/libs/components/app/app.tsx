import { Loader, RouterOutlet } from '#libs/components/components.js';
import { DataStatus } from '#libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useNavigate,
} from '#libs/hooks/hooks.js';
import { actions as appActions } from '#slices/app/app.js';
import { actions as authActions } from '#slices/auth/auth.js';

const App: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { authenticatedUserDataStatus, redirectTo } = useAppSelector(
    ({ auth, app }) => ({
      authenticatedUserDataStatus: auth.authenticatedUserDataStatus,
      redirectTo: app.redirectTo,
    }),
  );

  useEffect(() => {
    void dispatch(authActions.getAuthenticatedUser());
  }, [dispatch, navigate]);

  useEffect(() => {
    if (redirectTo) {
      navigate(redirectTo);
      dispatch(appActions.navigate(null));
    }
  }, [dispatch, navigate, redirectTo]);

  if (authenticatedUserDataStatus === DataStatus.PENDING) {
    return <Loader />;
  }

  return <RouterOutlet />;
};

export { App };
