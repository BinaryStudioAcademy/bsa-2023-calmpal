import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  messageWrapper: {
    flexDirection: 'row-reverse',
    marginVertical: 15,
  },
  sameMessageWrapper: {
    marginTop: -3,
    marginBottom: 15,
  },
  userWrapper: {
    flexDirection: 'row',
  },
  avatar: {
    height: 40,
    width: 40,
    backgroundColor: AppColor.BLUE_300,
    borderRadius: 8,
    marginRight: 0,
    marginLeft: 16,
  },
  transparentAvatar: {
    backgroundColor: 'transparent',
  },
  userAvatar: {
    backgroundColor: AppColor.GRAY_400,
    marginLeft: 0,
    marginRight: 16,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    maxWidth: '85%',
    backgroundColor: AppColor.BLUE_300,
    color: AppColor.WHITE,
  },
  userMessage: {
    backgroundColor: AppColor.GRAY_100,
    color: AppColor.GRAY_600,
  },
});

export { styles };
