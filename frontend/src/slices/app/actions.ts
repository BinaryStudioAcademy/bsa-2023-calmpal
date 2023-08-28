import { createAsyncThunk } from '@reduxjs/toolkit';

import { type NotificationPayload } from '#libs/packages/notification/libs/types/types.js';
import { type Notification } from '#libs/packages/notification/notification.package.js';
import { type AsyncThunkConfig } from '#libs/types/types.js';

const notify = createAsyncThunk<unknown, NotificationPayload, AsyncThunkConfig>(
  'app/notify',
  (payload, { extra }) => {
    const notification: Notification = extra.notification;
    const { type, message } = payload;

    notification[type](message);
  },
);

export { notify };
