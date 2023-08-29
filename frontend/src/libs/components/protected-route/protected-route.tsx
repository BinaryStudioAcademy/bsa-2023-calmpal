import { type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { AppRoute } from '#libs/enums/enums.js';
import { useAppSelector } from '#libs/hooks/hooks.js';
import { type ValueOf } from '#libs/types/types.js';

type Properties = {
  children: ReactNode;
  shouldBeAuthenticated?: boolean;
  redirectPath?: ValueOf<typeof AppRoute>;
};

const ProtectedRoute: React.FC<Properties> = ({
  children,
  shouldBeAuthenticated = true,
  redirectPath = AppRoute.SIGN_IN,
}) => {
  const { pathname } = useLocation();
  const { authenticatedUser } = useAppSelector(({ auth }) => ({
    authenticatedUser: auth.authenticatedUser,
  }));

  const hasUser = Boolean(authenticatedUser);
  const hasNoSurvey =
    hasUser &&
    !authenticatedUser?.isSurveyCompleted &&
    pathname !== AppRoute.SURVEY;

  if (hasNoSurvey) {
    return <Navigate to={AppRoute.SURVEY} />;
  }

  if (
    (!shouldBeAuthenticated && hasUser) ||
    (shouldBeAuthenticated && !hasUser)
  ) {
    return <Navigate to={redirectPath} />;
  }

  return <>{children}</>;
};

export { ProtectedRoute };
