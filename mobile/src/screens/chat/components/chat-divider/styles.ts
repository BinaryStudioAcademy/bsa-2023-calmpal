import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  date: {
    color: AppColor.GRAY_300,
    paddingHorizontal: 10,
  },
  beforeElement: {
    flex: 1,
    height: 1,
    backgroundColor: AppColor.GRAY_200,
  },
  afterElement: {
    flex: 1,
    height: 1,
    backgroundColor: AppColor.GRAY_200,
  },
});

export { styles };
