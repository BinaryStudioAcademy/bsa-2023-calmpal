import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  btn: {
    backgroundColor: AppColor.GRAY_400,
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    borderRadius: 8,
    gap: 10,
    marginVertical: 10,
  },
  label: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  btnDisabled: {
    backgroundColor: AppColor.TRANSPARENT_GRAY_200,
  },
  labelDisabled: {
    color: AppColor.TRANSPARENT_GRAY_100,
  },
  btnPressed: {
    backgroundColor: AppColor.GRAY_500,
  },
});

export { styles };
