import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: AppColor.BLACK,
    marginTop: 4,
  },
  file: {
    width: 230,
    height: 170,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: AppColor.GRAY_400,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryText: {
    fontSize: 18,
    fontWeight: '600',
    color: AppColor.GRAY_600,
    marginTop: 10,
  },
  secondaryText: {
    fontSize: 14,
    color: AppColor.GRAY_400,
  },
  selectedFile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedFileName: {
    marginLeft: 5,
    color: AppColor.GRAY_500,
  },
});

export { styles };
