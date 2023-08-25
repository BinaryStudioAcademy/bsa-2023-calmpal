import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  linkWrapper: {
    flexGrow: 1,
    textAlign: 'center',
  },
  linkContent: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  icon: {
    marginRight: 8,
  },
  link: {
    color: AppColor.BLUE_300,
    fontSize: 16,
    fontWeight: '600',
  },
});

export { styles };
