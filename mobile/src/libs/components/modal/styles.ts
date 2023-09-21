import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
    color: AppColor.GRAY_500,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
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
    backgroundColor: AppColor.GRAY_200_ALPHA_50,
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 12,
  },
});
export { styles };
