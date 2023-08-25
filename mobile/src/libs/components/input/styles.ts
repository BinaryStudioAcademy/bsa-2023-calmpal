import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'gray',
  },
  placeholder: {
    color: AppColor.GRAY_300,
  },
});

export { styles };
