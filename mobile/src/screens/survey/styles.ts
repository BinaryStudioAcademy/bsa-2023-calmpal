import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  labelText: {
    color: AppColor.BLUE_300,
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: AppColor.WHITE,
    borderRadius: 22,
    paddingHorizontal: 12,
    paddingVertical: 6,
    justifyContent: 'center',
    marginTop: 30,
    width: 76,
    paddingTop: 8,
    paddingBottom: 8,
    alignSelf: 'flex-end',
  },
});

export { styles };
