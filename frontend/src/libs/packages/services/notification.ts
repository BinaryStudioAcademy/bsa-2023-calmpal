import { toast } from 'react-toastify';

import { NotificationType } from './libs/enums/notification-type.enum.js';

const Notification = {
  error(message: string): void {
    show(message, NotificationType.ERROR);
  },

  success(message: string): void {
    show(message, NotificationType.SUCCESS);
  },

  warning(message: string): void {
    show(message, NotificationType.WARNING);
  },

  info(message: string): void {
    show(message, NotificationType.INFO);
  },
};

function show(
  message: string,
  type: (typeof NotificationType)[keyof typeof NotificationType],
): void {
  toast(message, { type });
}

export { Notification };
