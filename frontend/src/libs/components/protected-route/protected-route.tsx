import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { AppRoute } from '#libs/enums/enums.js';
import { useAppSelector, useLocation } from '#libs/hooks/hooks.js';
import { type ValueOf } from '#libs/types/types.js';

type Properties = {
  children: ReactNode;
  redirectPath?: ValueOf<typeof AppRoute>;
};

const ProtectedRoute: React.FC<Properties> = ({
  children,
  redirectPath = AppRoute.SIGN_IN,
}) => {
  const { pathname } = useLocation();

  const { authenticatedUser, surveyPreferences } = useAppSelector(
    ({ auth, survey }) => ({
      authenticatedUser: auth.authenticatedUser,
      surveyPreferences: survey.isSurveyCompleted,
    }),
  );
  const hasUser = Boolean(authenticatedUser);
  const hasNoSurvey =
    hasUser && !surveyPreferences && pathname !== AppRoute.SURVEY;

  if (hasNoSurvey) {
    return <Navigate to={AppRoute.SURVEY} />;
  }

  return hasUser ? <>{children}</> : <Navigate to={redirectPath} />;
};

export { ProtectedRoute };
