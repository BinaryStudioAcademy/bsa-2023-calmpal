import { StyleSheet } from 'react-native';

import { AppColor, FontFamily } from '~/libs/enums/enums';

const styles = StyleSheet.create({
  formContainer: {
    height: '100%',
    width: '100%',
    paddingHorizontal: 40,
  },
  titleText: {
    fontSize: 30,
    color: AppColor.WHITE,
    marginBottom: 30,
    marginTop: 30,
    fontFamily: FontFamily.MONTSERRAT_600,
  },
  bottomText: {
    fontSize: 13,
    fontFamily: FontFamily.MONTSERRAT_400,
  },
  boldText: {
    fontFamily: FontFamily.MONTSERRAT_600,
  },
});

export { styles };
