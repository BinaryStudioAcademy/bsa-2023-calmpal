import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  header: {
    backgroundColor: AppColor.WHITE,
    borderBottomColor: AppColor.GRAY_100,
    borderBottomWidth: 1,
    height: 81,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 31,
  },
  headerCenter: {
    justifyContent: 'center',
  },
  titleBadgeContainer: {
    flexDirection: 'row',
  },
  settingsContainer: {
    flexDirection: 'row',
  },
  settings: {
    justifyContent: 'space-between',
  },
  title: {
    color: AppColor.GRAY_500,
    fontSize: 20,
    fontWeight: '600',
    maxWidth: 300,
  },
  chatTitle: {
    color: AppColor.GRAY_500,
    fontSize: 14,
    fontWeight: '600',
    maxWidth: 300,
  },
});

export { styles };
