import Toast from 'react-native-toast-message';

class NotificationService {
  public error(message: string): void {
    Toast.show({
      type: 'error',
      text1: '⛔ An error occurred: ',
      text2: message,
    });
  }
}

export { NotificationService };
