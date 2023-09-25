import { StyleSheet } from 'react-native';

import { AppColor, FontFamily } from '#libs/enums/enums';

const styles = StyleSheet.create({
  duration: {
    color: AppColor.GRAY_200_ALPHA_50,
    fontSize: 20,
    fontFamily: FontFamily.MONTSERRAT_600,
  },
  durationItem: {
    alignItems: 'center',
    backgroundColor: AppColor.WHITE,
    borderColor: AppColor.GRAY_200_ALPHA_50,
    borderRadius: 80,
    borderWidth: 1,
    height: 80,
    justifyContent: 'center',
    width: 80,
  },
  durationUnit: {
    color: AppColor.GRAY_200_ALPHA_50,
    fontSize: 12,
    fontFamily: FontFamily.MONTSERRAT_600,
  },
  activeDuration: {
    backgroundColor: AppColor.BLUE_300,
    borderWidth: 0,
  },
  activeText: {
    color: AppColor.WHITE,
  },
});

export { styles };
