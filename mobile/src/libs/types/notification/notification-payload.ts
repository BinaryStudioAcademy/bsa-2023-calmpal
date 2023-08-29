import { type NotificationType } from '#libs/enums/enums';

import { type ValueOf } from '../types';

type NotificationPayload = {
  type: ValueOf<typeof NotificationType>;
  message: string;
};

export { type NotificationPayload };
