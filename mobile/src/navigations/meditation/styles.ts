import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  header: {
    backgroundColor: AppColor.WHITE,
    borderBottomColor: AppColor.GRAY_100,
    borderBottomWidth: 1,
    height: 81,
  },
  headerTitle: {
    color: AppColor.GRAY_500,
    fontSize: 20,
    fontWeight: '600',
  },
});

export { styles };
