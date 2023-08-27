import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 16,
    paddingHorizontal: 12,
    paddingTop: 28,
  },
  linearGradient: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 4,
  },
  headerTitleWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTitle: {
    color: AppColor.GRAY_500,
    fontSize: 20,
    fontWeight: '600',
  },
});

export { styles };
