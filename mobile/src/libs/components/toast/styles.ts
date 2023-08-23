import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  errorToast: {
    borderColor: AppColor.RED_100,
  },
  text1: {
    fontSize: 15,
  },
  text2: {
    color: AppColor.GRAY_400,
  },
});

export { styles };
