import Toast from 'react-native-toast-message';

import { type NotificationProperties } from './libs/types/notification-properties';
import { NotificationType } from './notification';

class Notification {
  private show = (payload: NotificationProperties): void => {
    const { type, title, message } = payload;

    Toast.show({
      type: type,
      text1: title,
      text2: message,
    });
  };

  public [NotificationType.ERROR](message: string): void {
    this.show({
      type: NotificationType.ERROR,
      title: '⛔ Error:',
      message,
    });
  }

  public [NotificationType.SUCCESS](message: string): void {
    this.show({
      type: NotificationType.SUCCESS,
      title: '✅ Success:',
      message,
    });
  }

  public [NotificationType.INFO](message: string): void {
    this.show({
      type: NotificationType.INFO,
      title: '🔷Information:',
      message,
    });
  }
}

export { Notification };
