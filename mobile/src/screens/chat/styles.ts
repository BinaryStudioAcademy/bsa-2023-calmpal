import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: AppColor.TRANSPARENT_BLUE_100,
  },
  input: {
    backgroundColor: AppColor.BLUE_100,
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 0,
  },
});

export { styles };
