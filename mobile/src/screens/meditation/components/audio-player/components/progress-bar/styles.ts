import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  timeWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  time: {
    color: AppColor.GRAY_400,
  },
  progressBar: {
    marginTop: 7,
    marginBottom: 30,
    height: 2.5,
    backgroundColor: AppColor.GRAY_300,
  },
  innerProgressBar: {
    backgroundColor: AppColor.GRAY_400,
    width: '30%',
    height: '100%',
  },
});

export { styles };
