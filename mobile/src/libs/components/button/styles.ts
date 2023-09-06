import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    gap: 10,
    marginVertical: 10,
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
  },
  buttonSolid: {
    backgroundColor: AppColor.GRAY_500,
    borderRadius: 8,
  },
  labelSolid: {
    color: AppColor.WHITE,
  },
  buttonDisabled: {
    backgroundColor: AppColor.GRAY_200_ALPHA_50,
  },
  labelDisabled: {
    color: AppColor.GRAY_100_ALPHA_50,
  },
  buttonOutlined: {
    borderRadius: 22,
    backgroundColor: AppColor.WHITE,
  },
  labelOutlined: {
    color: AppColor.BLUE_400,
  },
  iconButtonContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: AppColor.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: AppColor.BLUE_300,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
});

export { styles };
