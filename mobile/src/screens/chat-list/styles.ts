import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 16,
    paddingHorizontal: 12,
    paddingTop: 28,
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
  linkWrapper: {
    alignItems: 'center',
  },
  link: {
    color: AppColor.BLUE_300,
    fontSize: 16,
    fontWeight: '600',
    paddingLeft: 30,
  },
  icon: {
    left: -30,
    position: 'absolute',
    top: -20,
  },
});

export { styles };
