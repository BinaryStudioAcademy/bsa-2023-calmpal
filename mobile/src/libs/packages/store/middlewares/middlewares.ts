import {
  type AnyAction,
  type Dispatch,
  isRejected,
  type Middleware,
} from '@reduxjs/toolkit';

import { NotificationService } from '#libs/packages/services/notification-service';

const notificationService = new NotificationService();

const handleError: Middleware = () => {
  return (next: Dispatch) => {
    return (action: AnyAction) => {
      const result = next(action);

      if (isRejected(action)) {
        const errorMessage = action.error.message as string;
        notificationService.ERROR(errorMessage);
      }

      return result;
    };
  };
};

export { handleError };
