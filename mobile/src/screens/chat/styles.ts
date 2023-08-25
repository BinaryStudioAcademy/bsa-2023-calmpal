import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  containerWrapper: { backgroundColor: AppColor.WHITE, flex: 1 },
  container: {
    backgroundColor: AppColor.TRANSPARENT_BLUE_100,
    flex: 1,
    paddingBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 28,
  },
  input: {
    backgroundColor: AppColor.BLUE_100,
    borderRadius: 12,
    borderWidth: 0,
    fontSize: 14,
    height: 48,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export { styles };
