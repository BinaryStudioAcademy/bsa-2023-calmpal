import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  labelContainer: {
    backgroundColor: AppColor.BLUE_200,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
    marginTop: 50,
    width: 140,
    paddingTop: 14,
    paddingBottom: 14,
  },
  labelText: {
    color: AppColor.WHITE,
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 3,
  },
});

export { styles };
