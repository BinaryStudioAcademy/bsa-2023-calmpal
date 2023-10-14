import { StyleSheet } from 'react-native';

import { AppColor, FontFamily } from '~/libs/enums/enums';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: AppColor.GRAY_200_ALPHA_50,
  },
  modal: {
    backgroundColor: AppColor.WHITE,
    borderColor: AppColor.GRAY_100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
    paddingHorizontal: 30,
    paddingTop: 30,
    elevation: 20,
    shadowColor: AppColor.BLUE_300,
  },
  title: {
    alignSelf: 'center',
    color: AppColor.BLACK,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
    fontFamily: FontFamily.MONTSERRAT_600,
  },
  durations: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
    marginBottom: 10,
  },
});

export { styles };
