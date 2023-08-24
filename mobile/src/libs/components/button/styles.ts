import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  button: {
    backgroundColor: AppColor.GRAY_400,
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    borderRadius: 8,
    gap: 10,
    marginVertical: 10,
    transform: [{ scale: 1 }],
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
  buttonPressed: {
    backgroundColor: AppColor.GRAY_500,
    transform: [{ scale: 0.97 }],
  },
});

export { styles };
