import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: AppColor.WHITE,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: AppColor.BLUE_200,
    elevation: 20,
  },
  background: {
    backgroundColor: AppColor.GRAY_300_ALPHA_10,
    flex: 1,
  },
  closeButton: {
    right: 5,
    top: 5,
  },
});

export { styles };
