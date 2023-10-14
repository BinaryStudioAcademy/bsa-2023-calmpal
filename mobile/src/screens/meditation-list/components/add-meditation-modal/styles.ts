import { StyleSheet } from 'react-native';

import { AppColor, FontFamily } from '~/libs/enums/enums';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    color: AppColor.GRAY_600,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: FontFamily.MONTSERRAT_600,
  },
});

export { styles };
