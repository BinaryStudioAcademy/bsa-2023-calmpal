import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    color: AppColor.GRAY_300,
  },
  beforeElement: {
    width: '45%',
    height: 1,
    backgroundColor: AppColor.GRAY_200,
  },
  afterElement: {
    width: '45%',
    height: 1,
    backgroundColor: AppColor.GRAY_200,
  },
});

export { styles };
