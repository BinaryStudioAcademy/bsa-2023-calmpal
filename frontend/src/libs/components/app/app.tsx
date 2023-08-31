import { Loader, RouterOutlet } from '#libs/components/components.js';
import { DataStatus } from '#libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
} from '#libs/hooks/hooks.js';
import { storage, StorageKey } from '#libs/packages/storage/storage.js';
import { actions as authActions } from '#slices/auth/auth.js';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { authenticatedUserDataStatus } = useAppSelector(({ auth }) => ({
    authenticatedUserDataStatus: auth.authenticatedUserDataStatus,
  }));

  const handleGetAuthenticatedUser = useCallback(async (): Promise<void> => {
    const hasToken = await storage.has(StorageKey.TOKEN);

    if (hasToken) {
      await dispatch(authActions.getAuthenticatedUser());
    }
  }, [dispatch]);

  useEffect(() => {
    void handleGetAuthenticatedUser();
  }, [handleGetAuthenticatedUser]);

  if (authenticatedUserDataStatus === DataStatus.PENDING) {
    return <Loader />;
  }

  return <RouterOutlet />;
};

export { App };
