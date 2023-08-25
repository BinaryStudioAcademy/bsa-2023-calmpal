import Toast from 'react-native-toast-message';

import { NotificationType } from '#libs/enums/enums';

class NotificationService {
  private show = (type: string, message: string): void => {
    Toast.show({
      type: type,
      text1: '⛔ An error occurred: ',
      text2: message,
    });
  };

  public error(message: string): void {
    this.show(NotificationType.ERROR, message);
  }
}

export { NotificationService };
