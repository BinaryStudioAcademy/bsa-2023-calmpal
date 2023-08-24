import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  chatLayoutWrapper: {
    flex: 1,
    paddingVertical: 88,
    backgroundColor: AppColor.WHITE,
  },
  header: {
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  avatar: {
    width: 40,
    height: 40,
    backgroundColor: AppColor.BLUE_200,
    borderRadius: 10,
  },
  title: {
    fontWeight: '600',
    fontSize: 22,
    color: AppColor.GRAY_500,
    marginLeft: 17,
  },
  divider: {
    height: 1,
    backgroundColor: AppColor.GRAY_100,
  },
  chatWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    marginBottom: 50, //
    backgroundColor: 'green',
  },
});

export { styles };
