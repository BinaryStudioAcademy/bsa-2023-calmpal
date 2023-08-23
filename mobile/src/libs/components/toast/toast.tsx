import React from 'react';
import Toast, { ErrorToast } from 'react-native-toast-message';

import { styles } from './styles';

type Properties = {
  type?: string;
  text1?: string;
  text2?: string;
};

const toastConfig = {
  error: (properties: Properties): React.ReactNode => (
    <ErrorToast
      {...properties}
      style={styles.errorToast}
      text1Style={styles.text1}
      text2Style={styles.text2}
    />
  ),
};

const ToastComponent: React.FC = () => {
  return <Toast config={toastConfig} />;
};

export { ToastComponent };
