import { StyleSheet } from 'react-native';

import { AppColor } from '~/libs/enums/enums';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: AppColor.GRAY_100_ALPHA_50,
    height: '100%',
    width: '100%',
  },
});

export { styles };
