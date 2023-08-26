import { createAction } from '@reduxjs/toolkit';

import { NotificationType } from '#libs/packages/services/libs/enums/enums.js';
import { Notification } from '#libs/packages/services/notification.js';

import { name as sliceName } from './app.slice.js';

type NotificationPayload = {
  type: (typeof NotificationType)[keyof typeof NotificationType];
  message: string;
};

const notify = createAction(
  `${sliceName}/notify`,
  (notificationPayload: NotificationPayload) => {
    const { type, message } = notificationPayload;
    switch (type) {
      case NotificationType.ERROR: {
        Notification.error(message);
        break;
      }
      case NotificationType.SUCCESS: {
        Notification.success(message);
        break;
      }
      case NotificationType.WARNING: {
        Notification.warning(message);
        break;
      }
      case NotificationType.INFO: {
        Notification.info(message);
        break;
      }
    }

    return { payload: notificationPayload };
  },
);

export { notify };
