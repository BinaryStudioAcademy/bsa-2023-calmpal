import Toast from 'react-native-toast-message';

const NotificationService = {
  error(message: string): void {
    Toast.show({
      type: 'error',
      text1: message,
    });
  },
};

export { NotificationService };
