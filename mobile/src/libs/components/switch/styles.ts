import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  switchFalse: {
    color: AppColor.GRAY_400,
    backgroundColor: AppColor.WHITE,
  },
  switchTrue: {
    color: AppColor.BLUE_300,
    backgroundColor: AppColor.BLUE_100_ALPHA_70,
  },
});

export { styles };
