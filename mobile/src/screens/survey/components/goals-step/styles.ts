import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  surveyContainer: {
    flex: 1,
    marginTop: 40,
    paddingHorizontal: 55,
  },
  otherTextInput: {
    backgroundColor: AppColor.BLUE_100_ALPHA_70,
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    marginBottom: 20,
    borderColor: AppColor.WHITE,
    color: AppColor.BLUE_300,
    fontSize: 16,
  },
  titleText: {
    fontSize: 22,
    color: AppColor.WHITE,
    marginBottom: 30,
    marginTop: 30,
  },
  placeholder: {
    color: AppColor.WHITE,
  },
});

export { styles };
