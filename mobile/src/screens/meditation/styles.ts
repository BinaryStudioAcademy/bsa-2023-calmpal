import { StyleSheet } from 'react-native';

import { AppColor, FontFamily } from '#libs/enums/enums';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: AppColor.WHITE,
    flex: 1,
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  contentWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: 315,
  },
  imageWrapper: {
    width: '100%',
    height: 315,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: AppColor.WHITE,
    borderRadius: 20,
    marginTop: 37,
    marginBottom: 20,
    shadowColor: AppColor.BLUE_200,
    elevation: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  title: {
    fontSize: 22,
    color: AppColor.GRAY_600,
    fontFamily: FontFamily.MONTSERRAT_600,
  },
  purpose: {
    color: AppColor.GRAY_400,
    marginTop: 6,
    fontFamily: FontFamily.MONTSERRAT_600,
  },
});

export { styles };
