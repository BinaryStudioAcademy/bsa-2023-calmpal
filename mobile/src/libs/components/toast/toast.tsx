import React from 'react';
import LibraryToast, {
  ErrorToast,
  SuccessToast,
  type ToastConfig,
  type ToastConfigParams,
} from 'react-native-toast-message';

import { type NotificationType } from '~/libs/packages/notification/notification';
import { type ValueOf } from '~/libs/types/types';

import { styles } from './styles';

type Properties = {
  type?: ValueOf<typeof NotificationType>;
  title?: string;
  message?: string;
};

const toastConfig: ToastConfig = {
  error: (properties: ToastConfigParams<Properties>): React.ReactNode => {
    return (
      <ErrorToast
        {...properties}
        style={styles.errorToast}
        text1Style={styles.title}
        text2Style={styles.message}
      />
    );
  },
  success: (properties: ToastConfigParams<Properties>): React.ReactNode => {
    return (
      <SuccessToast
        {...properties}
        style={styles.successToast}
        text1Style={styles.title}
        text2Style={styles.message}
      />
    );
  },
};

const Toast: React.FC = () => {
  return <LibraryToast config={toastConfig} />;
};

export { Toast };
