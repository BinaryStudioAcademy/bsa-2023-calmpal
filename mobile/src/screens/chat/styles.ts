import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  containerWrapper: { flex: 1 },
  container: {
    flex: 1,
    paddingBottom: 16,
    paddingHorizontal: 12,
    paddingTop: 28,
  },
  input: {
    backgroundColor: AppColor.BLUE_100,
    borderRadius: 12,
    borderWidth: 0,
    fontSize: 14,
    height: 48,
    marginHorizontal: 4,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  linearGradient: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 4,
  },
});

export { styles };
