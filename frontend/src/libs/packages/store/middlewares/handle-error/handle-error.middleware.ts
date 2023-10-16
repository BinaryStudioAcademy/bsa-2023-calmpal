import { type AnyAction, isRejected, type Middleware } from '@reduxjs/toolkit';

import { NotificationType } from '~/libs/packages/notification/libs/enums/enums.js';
import { type AppDispatch } from '~/libs/packages/store/libs/types/types.js';
import { appActions } from '~/slices/app/app-notification.js';

const handleError: Middleware<unknown, unknown, AppDispatch> = ({
  dispatch,
}) => {
  return (next) => {
    return (action: AnyAction) => {
      if (isRejected(action)) {
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
