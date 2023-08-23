import {
  type AnyAction,
  type Dispatch,
  type Middleware,
} from '@reduxjs/toolkit';
import { isRejected } from '@reduxjs/toolkit';

import { NotificationService } from '#libs/helpers/notification-service.js';

const handleAction =
  (next: Dispatch): ((action: AnyAction) => AnyAction) =>
  (action: AnyAction): AnyAction => {
    if (isRejected(action) && action.error.message) {
      NotificationService.error(action.error.message);
      return next(action);
    }
    return next(action);
  };

const handleError: Middleware = () => handleAction;

export { handleError };
