import { type ValueOf } from '~/libs/types/types';

import { type NotificationType } from '../enums/enums';

type NotificationProperties = {
  type: ValueOf<typeof NotificationType>;
  title: string;
  message: string;
};

export { type NotificationProperties };
