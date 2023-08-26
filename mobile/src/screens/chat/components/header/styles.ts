import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  title: {
    color: AppColor.GRAY_500,
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  badge: {
    backgroundColor: AppColor.GRAY_200,
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
