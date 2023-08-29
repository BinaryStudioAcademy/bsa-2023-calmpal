import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  labelText: {
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: AppColor.WHITE,
    paddingHorizontal: 10,
    justifyContent: 'center',
    marginTop: 30,
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'flex-end',
  },
});

export { styles };
