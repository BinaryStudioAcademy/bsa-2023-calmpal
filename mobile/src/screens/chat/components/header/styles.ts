import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: AppColor.WHITE,
    borderRadius: 20,
    display: 'flex',
    elevation: 5,
    flex: 1,
    flexDirection: 'row',
    gap: 20,
    height: 83,
    marginBottom: 8,
    padding: 3,
    shadowColor: AppColor.BLUE_200,
  },
  title: {
    color: AppColor.GRAY_400,
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  badge: {
    backgroundColor: AppColor.GRAY_400,
    borderRadius: 24,
    marginLeft: 10,
    marginTop: 2,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    color: AppColor.BLACK,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 18,
  },
});

export { styles };
