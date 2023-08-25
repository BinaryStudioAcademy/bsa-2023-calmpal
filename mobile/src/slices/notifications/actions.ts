import { createAction } from '@reduxjs/toolkit';
import { type ValueOf } from 'react-native-gesture-handler/lib/typescript/typeUtils';

import { type NotificationType } from '#libs/enums/enums';
import { NotificationService } from '#libs/packages/services/notification-service';

import { name as sliceName } from './notifications.slice';

const notificationsService = new NotificationService();

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
