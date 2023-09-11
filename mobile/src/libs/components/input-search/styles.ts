import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  input: {
    backgroundColor: AppColor.BLUE_100,
    borderRadius: 12,
    borderWidth: 0,
    fontSize: 14,
    height: 48,
    marginBottom: 23,
    marginHorizontal: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  focusedInput: {
    borderWidth: 1,
    borderColor: AppColor.BLUE_300,
    elevation: 10,
    shadowColor: AppColor.BLUE_300,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
});

export { styles };
