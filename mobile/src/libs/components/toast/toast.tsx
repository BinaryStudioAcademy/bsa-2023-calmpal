import React from 'react';
import Toast, { ErrorToast } from 'react-native-toast-message';

import { AppColor } from '#libs/enums/enums';

const toastConfig = {
  error: (properties: object): React.ReactNode => (
    <ErrorToast
      {...properties}
      style={{ borderColor: AppColor.RED_100 }}
      text1Style={{
        fontSize: 15,
      }}
      text2Style={{
        color: AppColor.GRAY_400,
      }}
    />
  ),
};

const ToastComponent: React.FC = () => {
  return <Toast config={toastConfig} />;
};

export { ToastComponent };
