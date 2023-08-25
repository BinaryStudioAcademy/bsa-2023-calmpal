import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    height: 83,
    elevation: 2,
    backgroundColor: AppColor.WHITE,
    borderRadius: 20,
    marginBottom: 8,
    padding: 3,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  image: {
    borderRadius: 20,
    width: 77,
    height: 77,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 25,
    color: AppColor.GRAY_400,
    flex: 1,
  },
  icon: {
    paddingRight: 28,
  },
});

export { styles };
