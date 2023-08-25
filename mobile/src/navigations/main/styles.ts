import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  tabBarStyle: {
    borderTopWidth: 0,
    elevation: 4,
    height: 122,
    shadowColor: AppColor.GRAY_300,
  },
  headerStyle: {
    backgroundColor: AppColor.WHITE,
    borderBottomColor: AppColor.GRAY_100,
    borderBottomWidth: 1,
    height: 81,
    paddingHorizontal: 24,
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTitleStyle: {
    fontSize: 20,
    fontWeight: '600',
    color: AppColor.GRAY_500,
  },
});

export { styles };
