import { Loader, RouterOutlet } from '#libs/components/components.js';
import { AppRoute, DataStatus } from '#libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useNavigate,
} from '#libs/hooks/hooks.js';
import { actions as authActions } from '#slices/auth/auth.js';

const App: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { authenticatedUserDataStatus } = useAppSelector(({ auth }) => ({
    authenticatedUserDataStatus: auth.authenticatedUserDataStatus,
  }));

  useEffect(() => {
    void dispatch(authActions.getAuthenticatedUser());
    navigate(AppRoute.ROOT);
  }, [dispatch, navigate]);

  if (authenticatedUserDataStatus === DataStatus.PENDING) {
    return <Loader />;
  }

  return <RouterOutlet />;
};

export { App };
