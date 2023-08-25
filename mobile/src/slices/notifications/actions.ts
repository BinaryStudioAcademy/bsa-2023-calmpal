import { createAction } from '@reduxjs/toolkit';

import { NotificationService } from '#libs/packages/services/notification-service';

import { name as sliceName } from './notifications.slice';

const notificationsService = new NotificationService();

type NotificationPayload = {
  type: string;
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
