import { StyleSheet } from 'react-native';

import { AppColor } from '~/libs/enums/enums';

const styles = StyleSheet.create({
  editor: {
    backgroundColor: 'transparent',
  },
  placeholder: {
    color: AppColor.GRAY_400,
    position: 'absolute',
    top: 85,
    left: 25,
  },
});

export { styles };
