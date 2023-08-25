import Toast from 'react-native-toast-message';

import { NotificationType } from '#libs/enums/enums';

class NotificationService {
  private show = (type: string, message: string): void => {
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

  public error(message: string): void {
    this.show(NotificationType.ERROR, message);
  }
}

export { NotificationService };
