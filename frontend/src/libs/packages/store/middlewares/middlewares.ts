import { type AnyAction, type Middleware } from '@reduxjs/toolkit';
import { isRejected } from '@reduxjs/toolkit';

import { NotificationType } from '#libs/packages/services/libs/enums/enums.js';
import { appActions } from '#slices/notifications/notification.js';

const handleError: Middleware = ({ dispatch }) => {
  return (next) => {
    return (action: AnyAction) => {
      if (isRejected(action) && action.error.message) {
        dispatch(
          appActions.notify({
            message: action.error.message,
            type: NotificationType.ERROR,
          }),
        );
      }
      return next(action);
    };
  };
};

export { handleError };
