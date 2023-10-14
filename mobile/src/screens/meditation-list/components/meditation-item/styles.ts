import { StyleSheet } from 'react-native';

import { AppColor, FontFamily } from '~/libs/enums/enums';

const styles = StyleSheet.create({
  container: {
    height: 177,
    position: 'relative',
    marginBottom: 10,
    marginHorizontal: 12,
    borderRadius: 25,
    shadowColor: AppColor.PURPLE_100_ALPHA_50,
    elevation: 20,
  },
  image: {
    width: 187,
    height: '100%',
    backgroundColor: AppColor.BLUE_200,
    borderRadius: 25,
  },
  innerContainer: {
    position: 'absolute',
    right: 0,
    width: '77%',
    height: '100%',
    backgroundColor: AppColor.WHITE,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 23,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: AppColor.BLACK,
    maxWidth: 151,
    fontFamily: FontFamily.MONTSERRAT_600,
  },
  duration: {
    color: AppColor.PURPLE_200,
    paddingVertical: 5,
    backgroundColor: AppColor.PURPLE_100,
    maxWidth: 72,
    textAlign: 'center',
    borderRadius: 17,
    marginTop: 10,
    fontSize: 14,
    fontFamily: FontFamily.MONTSERRAT_400,
  },
  playButton: {
    width: 48,
    height: 48,
    backgroundColor: AppColor.BLUE_200,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 4,
  },
});

export { styles };
