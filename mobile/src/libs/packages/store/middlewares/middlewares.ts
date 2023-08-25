import {
  type AnyAction,
  type Dispatch,
  isRejected,
  type Middleware,
} from '@reduxjs/toolkit';

import { NotificationType } from '#libs/enums/notification/notification.enum';
import { notify } from '#slices/notifications/actions';

const handleError: Middleware = (store) => {
  return (next: Dispatch) => {
    return (action: AnyAction) => {
      const result = next(action);

      if (isRejected(action)) {
        const { message } = action.error;
        if (message) {
          store.dispatch(notify({ type: NotificationType.ERROR, message }));
        }
      }

      return result;
    };
  };
};

export { handleError };
