import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  formContainer: {
    height: '100%',
    width: '100%',
    paddingHorizontal: 55,
    marginBottom: 55,
  },
  titleText: {
    fontSize: 30,
    color: AppColor.WHITE,
    marginBottom: 30,
    marginTop: 30,
  },
  linkText: {
    fontWeight: 'bold',
  },
});

export { styles };
