import { type AnyAction, type Middleware } from '@reduxjs/toolkit';
import { isRejected } from '@reduxjs/toolkit';

import { NotificationService } from '#libs/packages/services/notification-service.js';
import { type AppDispatch } from '#libs/packages/store/store.js';
import { showErrorNotification } from '#slices/notifications/actions.js';

const handleError: Middleware = (api) => {
  return (next) => {
    return (action: AnyAction) => {
      const dispatch: AppDispatch = api.dispatch;
      if (isRejected(action) && action.error.message) {
        dispatch(showErrorNotification(action.error.message));
        NotificationService.error(action.error.message);
      }
      return next(action);
    };
  };
};

export { handleError };
