import { type ReactNode } from 'react';

import { AppRoute } from '~/libs/enums/enums.js';
import { useAppSelector } from '~/libs/hooks/hooks.js';
import { type ValueOf } from '~/libs/types/types.js';

import { Navigate } from '../components.js';

type Properties = {
  children: ReactNode;
  redirectPath?: ValueOf<typeof AppRoute>;
};

const ProtectedRoute: React.FC<Properties> = ({
  children,
  redirectPath = AppRoute.SIGN_IN,
}) => {
  const { authenticatedUser } = useAppSelector(({ auth }) => {
    return {
      authenticatedUser: auth.authenticatedUser,
    };
  });
  const hasUser = Boolean(authenticatedUser);

  return hasUser ? <>{children}</> : <Navigate to={redirectPath} />;
};

export { ProtectedRoute };
