import { StyleSheet } from 'react-native';

import { AppColor, FontFamily } from '#libs/enums/enums';

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    gap: 10,
    marginVertical: 10,
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    fontFamily: FontFamily.MONTSERRAT_600,
  },
  buttonSolid: {
    backgroundColor: AppColor.GRAY_500,
    borderRadius: 8,
  },
  labelSolid: {
    color: AppColor.WHITE,
    fontFamily: FontFamily.MONTSERRAT_600,
  },
  buttonDisabled: {
    backgroundColor: AppColor.GRAY_200_ALPHA_50,
  },
  labelDisabled: {
    color: AppColor.GRAY_100_ALPHA_50,
    fontFamily: FontFamily.MONTSERRAT_600,
  },
  buttonOutlined: {
    borderRadius: 22,
    backgroundColor: AppColor.WHITE,
  },
  labelOutlined: {
    color: AppColor.BLUE_400,
    fontFamily: FontFamily.MONTSERRAT_600,
  },
  labelModal: {
    color: AppColor.WHITE,
  },
  buttonRounded: {
    backgroundColor: AppColor.WHITE,
    borderRadius: 30,
    padding: 15,
    height: 55,
    width: 55,
    shadowColor: AppColor.BLUE_200,
    elevation: 20,
  },
  buttonTransparent: {
    backgroundColor: 'transparent',
  },
  visuallyCenteredButton: {
    paddingLeft: 18,
  },
  addButtonLabel: {
    color: AppColor.BLUE_300,
  },
  buttonModal: {
    borderRadius: 8,
    marginHorizontal: 10,
    paddingHorizontal: 20,
  },
  buttonModalCancel: {
    backgroundColor: AppColor.GRAY_400,
  },
  buttonModalDelete: {
    backgroundColor: AppColor.BLUE_300,
  },
});

export { styles };
