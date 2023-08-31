import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  buttonContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: AppColor.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { styles };
