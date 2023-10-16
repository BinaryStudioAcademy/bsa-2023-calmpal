import { StyleSheet } from 'react-native';

import { AppColor, FontFamily } from '~/libs/enums/enums';

const styles = StyleSheet.create({
  input: {
    backgroundColor: AppColor.BLUE_100,
    borderRadius: 12,
    borderWidth: 0,
    fontSize: 16,
    height: 48,
    marginBottom: 23,
    marginHorizontal: 24,
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: AppColor.GRAY_600,
    fontFamily: FontFamily.MONTSERRAT_400,
  },
  focusedInput: {
    borderWidth: 1,
    borderColor: AppColor.BLUE_300,
    elevation: 10,
    shadowColor: AppColor.BLUE_300,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
    color: AppColor.GRAY_600,
    fontFamily: FontFamily.MONTSERRAT_400,
  },
});

export { styles };
