import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

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
    paddingHorizontal: 38,
    alignItems: 'center',
  },
  imageWrapper: {
    width: 315,
    height: 315,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: AppColor.WHITE,
    borderRadius: 20,
    elevation: 1,
    marginTop: 37,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: AppColor.GRAY_600,
  },
  purpose: {
    fontWeight: '600',
    color: AppColor.GRAY_400,
    marginTop: 6,
  },
});

export { styles };
