import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  containerWrapper: { flex: 1 },
  container: {
    flex: 1,
    paddingBottom: 16,
    paddingHorizontal: 12, // The Main padding for all screens is 16, but we use 16-4=12 here because we add padding to the Item List to avoid shadow cutting
    paddingTop: 28,
  },
  input: {
    backgroundColor: AppColor.BLUE_100,
    borderRadius: 12,
    borderWidth: 0,
    fontSize: 14,
    height: 48,
    marginHorizontal: 4, // To align the input to the borders of the list
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  linearGradient: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 4, // To avoid problems with cutting a shadow
  },
});

export { styles };
