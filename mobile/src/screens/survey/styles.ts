import { StyleSheet } from 'react-native';

import { AppColor, FontFamily } from '#libs/enums/enums';

const styles = StyleSheet.create({
  titleText: {
    fontSize: 22,
    justifyContent: 'center',
    marginTop: 40,
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'center',
    color: AppColor.WHITE,
    fontFamily: FontFamily.MONTSERRAT_600,
  },
});

export { styles };
