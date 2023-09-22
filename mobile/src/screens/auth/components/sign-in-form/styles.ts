import { StyleSheet } from 'react-native';

import { FontFamily } from '#libs/enums/enums';

const styles = StyleSheet.create({
  formContainer: {
    height: '100%',
    width: '100%',
    paddingHorizontal: 44,
  },
  titleText: {
    fontSize: 30,
    color: 'white',
    marginBottom: 30,
    marginTop: 30,
    fontFamily: FontFamily.MONTSERRAT_600,
  },
  bottomText: {
    fontSize: 14,
    fontFamily: FontFamily.MONTSERRAT_400,
  },
  boldText: {
    fontFamily: FontFamily.MONTSERRAT_600,
  },
});

export { styles };
