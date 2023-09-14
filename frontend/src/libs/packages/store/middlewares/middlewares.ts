import { type AnyAction, type Middleware } from '@reduxjs/toolkit';
import { isRejected } from '@reduxjs/toolkit';
import { ExceptionMessage } from 'shared/build/index.js';

import { NotificationType } from '#libs/packages/notification/libs/enums/enums.js';
import { type AppDispatch } from '#libs/packages/store/libs/types/types.js';
import { appActions } from '#slices/app/app-notification.js';
import { signOut } from '#slices/auth/actions.js';

const handleError: Middleware<unknown, unknown, AppDispatch> = ({
  dispatch,
}) => {
  return (next) => {
    return (action: AnyAction) => {
      if (isRejected(action)) {
        if (action.error.message === ExceptionMessage.UNAUTHORIZED_USER) {
          void dispatch(signOut());
        }

        void dispatch(
          appActions.notify({
            message: action.error.message ?? 'Something went wrong',
            type: NotificationType.ERROR,
          }),
        );
      }

      return next(action);
    };
  };
};

export { handleError };
