import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { AppRoute, DataStatus } from '#libs/enums/enums.js';
import { useAppSelector } from '#libs/hooks/hooks.js';
import { type ValueOf } from '#libs/types/types.js';

type Properties = {
  children: ReactNode;
  redirectPath?: ValueOf<typeof AppRoute>;
};

const ProtectedRoute: React.FC<Properties> = ({
  children,
  redirectPath = AppRoute.SIGN_IN,
}) => {
  const { authenticatedUser, authenticatedUserDataStatus } = useAppSelector(
    ({ auth }) => ({
      authenticatedUser: auth.authenticatedUser,
      authenticatedUserDataStatus: auth.authenticatedUserDataStatus,
    }),
  );

  if (authenticatedUserDataStatus === DataStatus.FULFILLED) {
    const hasUser = Boolean(authenticatedUser);

    return hasUser ? <>{children}</> : <Navigate to={redirectPath} />;
  }
};

export { ProtectedRoute };
