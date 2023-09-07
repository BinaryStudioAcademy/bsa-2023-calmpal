import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  container: {
    height: 177,
    position: 'relative',
    marginBottom: 10,
  },
  image: {
    width: 187,
    height: '100%',
    backgroundColor: AppColor.BLUE_200,
    borderRadius: 25,
  },
  innerContainer: {
    position: 'absolute',
    right: 20,
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
  },
  duration: {
    color: AppColor.BLUE_300,
    paddingVertical: 5,
    backgroundColor: AppColor.PURPLE_100,
    maxWidth: 72,
    textAlign: 'center',
    borderRadius: 17,
    marginTop: 10,
    fontSize: 14,
  },
  playButton: {
    width: 48,
    height: 48,
    backgroundColor: AppColor.BLUE_200,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { styles };
