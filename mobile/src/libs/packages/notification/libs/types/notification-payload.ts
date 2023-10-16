import { type ValueOf } from '~/libs/types/types';

import { type NotificationType } from '../enums/enums';

type NotificationPayload = {
  type: ValueOf<typeof NotificationType>;
  message: string;
};

export { type NotificationPayload };
