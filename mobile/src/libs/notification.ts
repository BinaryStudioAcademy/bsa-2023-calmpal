import { type ValueOf } from 'react-native-gesture-handler/lib/typescript/typeUtils';
import Toast from 'react-native-toast-message';

import { type NotificationType } from '#libs/enums/enums';

type NotificationPayload = {
  type: ValueOf<typeof NotificationType>;
  message: string;
};

class Notification {
  private show = (
    type: ValueOf<typeof NotificationType>,
    message: string,
  ): void => {
    let titleMessage = '';

    switch (type) {
      case 'error': {
        titleMessage = '⛔ An error occurred: ';
        break;
      }
      case 'success': {
        titleMessage = '✅ Success: ';
        break;
      }
      case 'info': {
        titleMessage = '🔷Information: ';
        break;
      }
      default: {
        titleMessage = 'Message: ';
      }
    }

    Toast.show({
      type: type,
      text1: titleMessage,
      text2: message,
    });
  };

  public notification({ type, message }: NotificationPayload): void {
    this.show(type, message);
  }
}

export { Notification };
