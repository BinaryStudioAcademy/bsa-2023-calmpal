import {
  type AnyAction,
  type Dispatch,
  isRejected,
  type Middleware,
} from '@reduxjs/toolkit';

import { NotificationType } from '#libs/enums/notification/notification-type.enum';
import { notify } from '#slices/notifications/actions';

const handleError: Middleware = ({ dispatch }) => {
  return (next: Dispatch) => {
    return (action: AnyAction) => {
      const result = next(action);

      if (isRejected(action)) {
        const message = action.error as string;
        dispatch(notify({ type: NotificationType.ERROR, message }));
      }

      return result;
    };
  };
};

export { handleError };
