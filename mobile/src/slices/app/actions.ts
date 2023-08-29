import { createAsyncThunk } from '@reduxjs/toolkit';

import { type NotificationType } from '#libs/packages/notification/notification';
import { type AsyncThunkConfig, type ValueOf } from '#libs/types/types';

import { name as sliceName } from './notifications.slice';

type NotificationPayload = {
  type: ValueOf<typeof NotificationType>;
  message: string;
};

const notify = createAsyncThunk<unknown, NotificationPayload, AsyncThunkConfig>(
  `${sliceName}/notify`,
  (notificationPayload, { extra }) => {
    const { notification } = extra;
    const { type, message } = notificationPayload;

    notification[type](message);
  },
);

export { type NotificationPayload, notify };
