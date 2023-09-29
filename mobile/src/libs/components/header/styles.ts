import { StyleSheet } from 'react-native';

import { AppColor, FontFamily } from '#libs/enums/enums';

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
  largeTitle: {
    color: AppColor.GRAY_500,
    fontSize: 20,
    fontWeight: '600',
    maxWidth: 300,
    fontFamily: FontFamily.MONTSERRAT_600,
  },
  smallTitle: {
    fontSize: 16,
    maxWidth: 230,
    fontWeight: '600',
    color: AppColor.GRAY_500,
    fontFamily: FontFamily.MONTSERRAT_600,
  },
});

export { styles };
