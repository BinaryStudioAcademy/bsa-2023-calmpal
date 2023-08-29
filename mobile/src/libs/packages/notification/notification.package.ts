import Toast from 'react-native-toast-message';

import { NotificationType } from '#libs/enums/enums';

import { type NotificationProperties } from './libs/types/notification-properties';

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
      title: '⛔ An error occurred:',
      message,
    });
  }

  public [NotificationType.SUCCESS](message: string): void {
    this.show({
      type: NotificationType.ERROR,
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
