import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    marginTop: 6,
    fontSize: 22,
    fontWeight: 'bold',
    color: AppColor.GRAY_500,
  },
});

export { styles };
