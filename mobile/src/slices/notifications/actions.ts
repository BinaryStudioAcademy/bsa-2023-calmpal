import { createAction } from '@reduxjs/toolkit';

import { type NotificationType } from '#libs/enums/notification/notification.enum';
import { NotificationService } from '#libs/packages/services/notification-service';

import { name as sliceName } from './notifications.slice';

const notificationsService = new NotificationService();

type NotificationPayload = {
  type: typeof NotificationType.ERROR;
  message: string;
};

const notify = createAction(
  `${sliceName}/notify`,
  (notificationPayload: NotificationPayload) => {
    notificationsService.error(JSON.stringify(notificationPayload));
    return { payload: notificationPayload };
  },
);

export { notify };
