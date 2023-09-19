import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    color: AppColor.GRAY_600,
    fontWeight: '600',
    fontSize: 20,
    textAlign: 'center',
    marginTop: -20,
    marginBottom: 20,
  },
});

export { styles };
