import { StyleSheet } from 'react-native';

import { AppColor, FontFamily } from '~/libs/enums/enums';

const styles = StyleSheet.create({
  errorToast: {
    borderColor: AppColor.RED_100,
  },
  successToast: {
    borderColor: AppColor.GREEN_100,
  },
  title: {
    fontSize: 15,
    fontFamily: FontFamily.MONTSERRAT_600,
  },
  message: {
    color: AppColor.GRAY_400,
    fontFamily: FontFamily.MONTSERRAT_400,
  },
});

export { styles };
