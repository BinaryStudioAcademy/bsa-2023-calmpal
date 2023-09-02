import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  buttonContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: AppColor.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: AppColor.BLUE_300,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
});

export { styles };
