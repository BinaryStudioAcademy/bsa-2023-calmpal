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
});

export { styles };
