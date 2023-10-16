import { StyleSheet } from 'react-native';

import { AppColor, FontFamily } from '~/libs/enums/enums';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 30,
    backgroundColor: AppColor.GRAY_100,
    borderRadius: 20,
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    color: AppColor.GRAY_500,
    fontFamily: FontFamily.MONTSERRAT_600,
  },
});

export { styles };
