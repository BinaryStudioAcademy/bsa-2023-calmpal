import { StyleSheet } from 'react-native';

import { AppColor, FontFamily } from '#libs/enums/enums';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: AppColor.WHITE,
    justifyContent: 'space-around',
    borderRadius: 20,
    flexDirection: 'row',
    gap: 20,
    marginBottom: 8,
    paddingLeft: 3,
    paddingRight: 6,
    paddingVertical: 3,
    shadowColor: AppColor.PURPLE_100_ALPHA_50,
    elevation: 4,
  },
  image: {
    borderRadius: 20,
    height: 77,
    width: 77,
  },
  title: {
    color: AppColor.GRAY_500,
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 25,
    fontFamily: FontFamily.MONTSERRAT_600,
  },
  icon: {
    marginRight: 28,
  },
  iconContainer: {
    padding: 26,
    backgroundColor: AppColor.BLUE_300,
    borderRadius: 20,
  },
  titleContainer: {
    flex: 1,
    margin: 16,
  },
  deleteContainer: {
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
});

export { styles };
