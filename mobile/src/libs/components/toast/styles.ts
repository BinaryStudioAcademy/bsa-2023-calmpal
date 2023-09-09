import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  errorToast: {
    borderColor: AppColor.RED_100,
  },
  successToast: {
    borderColor: AppColor.GREEN_100,
  },
  title: {
    fontSize: 15,
  },
  message: {
    color: AppColor.GRAY_400,
  },
});

export { styles };
