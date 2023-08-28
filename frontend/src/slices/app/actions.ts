import { createAsyncThunk } from '@reduxjs/toolkit';

import { type NotificationPayload } from '#libs/packages/notification/notification.js';
import { type AsyncThunkConfig } from '#libs/types/types.js';

const notify = createAsyncThunk<unknown, NotificationPayload, AsyncThunkConfig>(
  'app/notify',
  (payload, { extra }) => {
    const { notification } = extra;
    const { type, message } = payload;

    notification[type](message);
  },
);

export { notify };
