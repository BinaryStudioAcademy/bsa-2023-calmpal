import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: AppColor.WHITE,
    borderRadius: 20,
    display: 'flex',
    elevation: 20,
    flex: 1,
    flexDirection: 'row',
    gap: 20,
    height: 83,
    marginBottom: 8,
    paddingLeft: 3,
    paddingRight: 6,
    paddingVertical: 3,
    shadowColor: AppColor.PURPLE_100,
  },
  image: {
    borderRadius: 20,
    height: 77,
    width: 77,
  },
  title: {
    color: AppColor.GRAY_500,
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 25,
  },
  icon: {
    marginRight: 28,
  },
});

export { styles };
