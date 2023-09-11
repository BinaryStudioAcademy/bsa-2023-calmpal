import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 16,
    paddingTop: 28,
  },
  list: {
    paddingHorizontal: 8,
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
