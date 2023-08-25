import Toast from 'react-native-toast-message';

type NotificationPayload = {
  type: string;
  message: string;
};

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

  public notification({ message, type }: NotificationPayload): void {
    this.show(type, message);
  }
}

export { NotificationService };
