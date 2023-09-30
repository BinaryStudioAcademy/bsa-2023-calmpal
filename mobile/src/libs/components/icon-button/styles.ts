import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  iconButtonContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: AppColor.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: AppColor.BLUE_300,
    elevation: 20,
  },
});

export { styles };
