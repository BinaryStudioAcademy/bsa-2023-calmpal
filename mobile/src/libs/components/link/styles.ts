import { StyleSheet } from 'react-native';

import { AppColor, FontFamily } from '~/libs/enums/enums';

const styles = StyleSheet.create({
  link: {
    color: AppColor.WHITE,
    fontSize: 16,
    marginBottom: 6,
    marginTop: 6,
    fontFamily: FontFamily.MONTSERRAT_600,
  },
});

export { styles };
