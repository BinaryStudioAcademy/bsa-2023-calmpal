import { type NotificationType } from '#libs/enums/enums';
import { type ValueOf } from '#libs/types/types';

type NotificationProperties = {
  type: ValueOf<typeof NotificationType>;
  title: string;
  message: string;
};

export { type NotificationProperties };
