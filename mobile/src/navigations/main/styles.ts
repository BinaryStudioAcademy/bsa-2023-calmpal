import { StyleSheet } from 'react-native';

import { AppColor } from '~/libs/enums/enums';

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 0,
    elevation: 4,
    height: 80,
    shadowColor: AppColor.GRAY_400,
  },
});

export { styles };
