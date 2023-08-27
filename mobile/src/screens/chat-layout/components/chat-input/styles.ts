import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingHorizontal: 20,
    width: '100%',
  },
  input: {
    backgroundColor: AppColor.WHITE,
    borderRadius: 12,
    paddingLeft: 20,
    paddingRight: 40,
    fontSize: 14,
    elevation: 2,
    color: AppColor.BLACK,
  },
  button: {
    position: 'absolute',
    right: 10,
    top: -35,
    width: 24,
    height: 24,
  },
});

export { styles };
