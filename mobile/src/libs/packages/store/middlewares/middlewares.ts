import {
  type AnyAction,
  type Dispatch,
  type Middleware,
} from '@reduxjs/toolkit';
import { isRejected } from '@reduxjs/toolkit';

import { NotificationService } from '#libs/packages/services/notification-service';

const notificationService = new NotificationService();

const handleAction =
  (next: Dispatch): ((action: AnyAction) => AnyAction) =>
  (action: AnyAction): AnyAction => {
    if (isRejected(action) && action.error.message) {
      notificationService.error(action.error.message);
      return next(action);
    }
    return next(action);
  };

const handleError: Middleware = () => handleAction;

export { handleError };
