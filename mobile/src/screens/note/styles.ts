import { StyleSheet } from 'react-native';

import { AppColor, FontFamily } from '~/libs/enums/enums';

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
  },
  textContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  title: {
    fontSize: 24,
    color: AppColor.GRAY_500,
    fontFamily: FontFamily.MONTSERRAT_600,
  },
  noteText: {
    fontSize: 16,
    lineHeight: 24,
    color: AppColor.GRAY_500,
    fontFamily: FontFamily.MONTSERRAT_400,
  },
  placeholder: {
    color: AppColor.GRAY_400,
  },
});

export { styles };
