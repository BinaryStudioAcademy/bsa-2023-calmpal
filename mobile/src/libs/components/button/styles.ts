import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  button: {
    backgroundColor: AppColor.GRAY_500,
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    borderRadius: 8,
    gap: 10,
    marginVertical: 10,
  },
  label: {
    color: AppColor.WHITE,
    fontWeight: '600',
    fontSize: 16,
  },
  buttonDisabled: {
    backgroundColor: AppColor.GRAY_200_ALPHA_50,
  },
  labelDisabled: {
    color: AppColor.GRAY_100_ALPHA_50,
  },
  buttonSurvey: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    gap: 10,
    marginVertical: 10,
    borderRadius: 22,
    backgroundColor: AppColor.WHITE,
  },
  labelSurvey: {
    color: AppColor.BLUE_300,
    fontWeight: '600',
    fontSize: 16,
  },
});

export { styles };
