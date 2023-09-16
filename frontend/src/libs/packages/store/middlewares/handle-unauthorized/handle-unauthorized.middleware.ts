import { type AnyAction, type Middleware } from '@reduxjs/toolkit';
import { isRejected } from '@reduxjs/toolkit';

import { type AppDispatch } from '#libs/packages/store/libs/types/types.js';
import { actions as authActions } from '#slices/auth/auth.js';

import { ExceptionMessage } from '../../libs/enums/enums.js';

const handleUnauthorized: Middleware<unknown, unknown, AppDispatch> = ({
  dispatch,
}) => {
  return (next) => {
    return (action: AnyAction) => {
      if (isRejected(action)) {
        const isUnauthorized =
          action.error.message === ExceptionMessage.UNAUTHORIZED_USER;

        isUnauthorized && void dispatch(authActions.signOut());

        return next(action);
      }
    };
  };
};

export { handleUnauthorized };
