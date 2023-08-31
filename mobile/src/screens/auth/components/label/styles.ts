import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  labelText: {
    color: AppColor.WHITE,
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 3,
    backgroundColor: AppColor.BLUE_300,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
    marginTop: 50,
    width: 140,
    paddingTop: 14,
    paddingBottom: 14,
  },
});

export { styles };
