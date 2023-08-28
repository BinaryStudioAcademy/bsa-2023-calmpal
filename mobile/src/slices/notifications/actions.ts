import { createAction } from '@reduxjs/toolkit';
import { type ValueOf } from 'react-native-gesture-handler/lib/typescript/typeUtils';

import { type NotificationType } from '#libs/enums/enums';
import { Notification } from '#libs/notification';

import { name as sliceName } from './notifications.slice';

const notificationsService = new Notification();

type NotificationPayload = {
  type: ValueOf<typeof NotificationType>;
  message: string;
};

const notify = createAction(
  `${sliceName}/notify`,
  (notificationPayload: NotificationPayload) => {
    notificationsService.notification(notificationPayload);

    return { payload: notificationPayload };
  },
);

export { notify };
