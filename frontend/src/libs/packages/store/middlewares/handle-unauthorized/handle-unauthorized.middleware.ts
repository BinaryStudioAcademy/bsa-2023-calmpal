import { type AnyAction, type Middleware } from '@reduxjs/toolkit';

import { ServerErrorType } from '#libs/enums/enums.js';
import { type AppDispatch } from '#libs/packages/store/libs/types/types.js';
import { actions as authActions } from '#slices/auth/auth.js';

type ErrorAction = {
  error?: {
    name: string;
  };
} & AnyAction;

const handleUnauthorized: Middleware<unknown, unknown, AppDispatch> = ({
  dispatch,
}) => {
  return (next) => {
    return (action: ErrorAction) => {
      const isUnauthorized =
        action.error && action.error.name === ServerErrorType.AUTHORIZATION;

      if (isUnauthorized) {
        void dispatch(authActions.signOut());
      }

      return next(action);
    };
  };
};

export { handleUnauthorized };
