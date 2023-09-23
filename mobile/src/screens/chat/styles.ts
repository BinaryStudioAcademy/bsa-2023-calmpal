import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: AppColor.WHITE,
    alignItems: 'center',
    paddingBottom: 1,
  },
  header: {
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 28,
    alignSelf: 'flex-start',
  },
  title: {
    fontWeight: '600',
    fontSize: 22,
    color: AppColor.GRAY_600,
    marginLeft: 17,
  },
  chatWrapper: {
    paddingHorizontal: 20,
    width: '100%',
  },
});

export { styles };
