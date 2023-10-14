import { createAsyncThunk } from '@reduxjs/toolkit';

import { type NotificationPayload } from '~/libs/packages/notification/notification';
import { type AsyncThunkConfig } from '~/libs/types/types';

import { name as sliceName } from './notifications.slice';

const notify = createAsyncThunk<unknown, NotificationPayload, AsyncThunkConfig>(
  `${sliceName}/notify`,
  (notificationPayload, { extra }) => {
    const { notification } = extra;
    const { type, message } = notificationPayload;

    notification[type](message);
  },
);

export { notify };
