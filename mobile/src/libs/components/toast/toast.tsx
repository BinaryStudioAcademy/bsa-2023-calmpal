import React from 'react';
import Toast, { ErrorToast } from 'react-native-toast-message';

import { toastStyles } from './styles';

const toastConfig = {
  error: (properties: object): React.ReactNode => (
    <ErrorToast
      {...properties}
      style={toastStyles.errorToast}
      text1Style={toastStyles.text1}
      text2Style={toastStyles.text2}
    />
  ),
};

const ToastComponent: React.FC = () => {
  return <Toast config={toastConfig} />;
};

export { ToastComponent };
