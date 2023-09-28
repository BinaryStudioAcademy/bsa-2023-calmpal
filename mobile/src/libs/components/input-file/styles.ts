import { StyleSheet } from 'react-native';

import { AppColor, FontFamily } from '#libs/enums/enums';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: AppColor.BLACK,
    marginTop: 4,
    fontFamily: FontFamily.MONTSERRAT_600,
  },
  file: {
    paddingHorizontal: 20,
    height: 170,
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: AppColor.GRAY_400,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorFile: {
    borderColor: AppColor.RED_100,
  },
  primaryText: {
    fontSize: 18,
    color: AppColor.GRAY_600,
    marginTop: 10,
    fontFamily: FontFamily.MONTSERRAT_600,
  },
  secondaryText: {
    fontSize: 14,
    color: AppColor.GRAY_400,
    fontFamily: FontFamily.MONTSERRAT_400,
  },
  selectedFile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedFileName: {
    marginLeft: 5,
    color: AppColor.GRAY_500,
    fontFamily: FontFamily.MONTSERRAT_400,
  },
  errorText: {
    color: AppColor.RED_100,
    fontSize: 14,
    marginBottom: 4,
    fontFamily: FontFamily.MONTSERRAT_400,
  },
});

export { styles };
