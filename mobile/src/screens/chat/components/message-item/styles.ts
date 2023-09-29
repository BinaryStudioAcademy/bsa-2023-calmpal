import { StyleSheet } from 'react-native';

import { AppColor, FontFamily } from '#libs/enums/enums';

const styles = StyleSheet.create({
  messageWrapper: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  sameMessageWrapper: {
    marginTop: -3,
    marginBottom: 15,
  },
  userWrapper: {
    flexDirection: 'row-reverse',
  },
  avatar: {
    marginRight: 16,
    marginLeft: 0,
  },
  transparentAvatar: {
    backgroundColor: 'transparent',
  },
  userAvatar: {
    backgroundColor: AppColor.GRAY_400,
    height: 40,
    width: 40,
    borderRadius: 8,
    marginRight: 0,
    marginLeft: 16,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: AppColor.BLUE_300,
    color: AppColor.WHITE,
    shadowColor: AppColor.BLUE_200,
    elevation: 20,
    fontFamily: FontFamily.MONTSERRAT_400,
  },
  userMessage: {
    backgroundColor: AppColor.GRAY_100,
    color: AppColor.GRAY_600,
    elevation: 0,
    fontFamily: FontFamily.MONTSERRAT_400,
  },
  messageContainer: {
    alignItems: 'flex-start',
    maxWidth: '82%',
  },
  userMessageContainer: {
    alignItems: 'flex-end',
  },
});

export { styles };
