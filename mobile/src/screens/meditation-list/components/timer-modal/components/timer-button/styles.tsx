import { StyleSheet } from 'react-native';

import { AppColor, FontFamily } from '~/libs/enums/enums';

const styles = StyleSheet.create({
  duration: {
    color: AppColor.GRAY_200_ALPHA_50,
    fontSize: 16,
    fontFamily: FontFamily.MONTSERRAT_600,
  },
  durationItem: {
    alignItems: 'center',
    backgroundColor: AppColor.WHITE,
    borderColor: AppColor.GRAY_200_ALPHA_50,
    borderRadius: 64,
    borderWidth: 1,
    height: 64,
    justifyContent: 'center',
    width: 64,
    elevation: 2,
    shadowColor: AppColor.PURPLE_200,
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
