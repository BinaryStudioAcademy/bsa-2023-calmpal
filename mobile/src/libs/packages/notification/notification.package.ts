import { type ValueOf } from 'react-native-gesture-handler/lib/typescript/typeUtils';
import Toast from 'react-native-toast-message';

import { NotificationType } from '#libs/enums/enums';

type NotificationPayload = {
  type: ValueOf<typeof NotificationType>;
  title: string;
  message: string;
};

class Notification {
  private show = (payload: NotificationPayload): void => {
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
      type: NotificationType.ERROR,
      title: '🔷Information:',
      message,
    });
  }
}

export { Notification };
