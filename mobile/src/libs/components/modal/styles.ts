import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    justifyContent: 'flex-end',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: AppColor.WHITE,
    borderColor: AppColor.GRAY_100,
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 20,
    shadowColor: 'red',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    alignSelf: 'center',
    marginBottom: 20,
    fontWeight: '600',
    color: AppColor.BLACK,
    fontSize: 16,
  },
  durations: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
    marginBottom: 10,
  },
  duration: {
    fontWeight: '500',
    color: AppColor.GRAY_200_ALPHA_50,
    fontSize: 20,
  },
  durationItem: {
    borderRadius: 80,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: AppColor.GRAY_200_ALPHA_50,
    borderWidth: 1,
    backgroundColor: AppColor.WHITE,
  },
  durationUnit: {
    fontSize: 12,
    color: AppColor.GRAY_200_ALPHA_50,
  },
  active: {
    backgroundColor: AppColor.BLUE_300,
    borderWidth: 0,
  },
  activeText: {
    color: AppColor.WHITE,
  },
});

export { styles };
