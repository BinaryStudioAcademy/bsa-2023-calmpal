import {
  type AnyAction,
  type Dispatch,
  isRejected,
  type Middleware,
} from '@reduxjs/toolkit';

import { NotificationType } from '#libs/enums/enums';
import { type AsyncThunkConfig } from '#libs/types/types';
import { appActions } from '#slices/app/notifications';

import { type AppDispatch } from '../libs/types/types';

const handleError: Middleware<AsyncThunkConfig, unknown, AppDispatch> = ({
  dispatch,
}) => {
  return (next: Dispatch) => {
    return (action: AnyAction) => {
      if (isRejected(action)) {
        void dispatch(
          appActions.notify({
            type: NotificationType.ERROR,
            message: action.error.message ?? 'An error occurred',
          }),
        );
      }

      return next(action);
    };
  };
};

export { handleError };
