import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  chatInputContainer: {
    position: 'relative',
    height: 48,
    width: '80%',
  },
  input: {
    position: 'absolute',
    width: '100%',
    backgroundColor: AppColor.WHITE,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 14,
    elevation: 2,
    color: AppColor.BLACK,
    paddingRight: 40,
  },
  button: {
    position: 'absolute',
    right: 10,
    top: 12,
    width: 24,
    height: 24,
  },
});

export { styles };
