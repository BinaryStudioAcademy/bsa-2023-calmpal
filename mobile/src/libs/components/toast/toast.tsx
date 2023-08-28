import React from 'react';
import { type ValueOf } from 'react-native-gesture-handler/lib/typescript/typeUtils';
import {
  type ToastConfig,
  type ToastConfigParams,
} from 'react-native-toast-message';
import LibraryToast, { ErrorToast } from 'react-native-toast-message';

import { type NotificationType } from '#libs/enums/enums';

import { styles } from './styles';

type Properties = {
  type?: ValueOf<typeof NotificationType>;
  title?: string;
  message?: string;
};

const toastConfig: ToastConfig = {
  error: (properties: ToastConfigParams<Properties>): React.ReactNode => (
    <ErrorToast
      {...properties}
      style={styles.errorToast}
      text1Style={styles.text1}
      text2Style={styles.text2}
    />
  ),
};

const Toast: React.FC = () => {
  return <LibraryToast config={toastConfig} />;
};

export { Toast };
