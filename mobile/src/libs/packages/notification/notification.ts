import { Notification } from './notification.package';

const notification = new Notification();

export { NotificationType } from './libs/enums/enums';
export {
  type NotificationPayload,
  type NotificationProperties,
} from './libs/types/types';
export { notification };
