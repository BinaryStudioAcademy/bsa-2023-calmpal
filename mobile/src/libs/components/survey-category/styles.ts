import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    borderWidth: 2,
    marginBottom: 10,
    borderColor: 'white',
  },
  selectedCategoryButton: {
    backgroundColor: AppColor.TRANSPARENT_BLUE_100,
  },
  categoryText: {
    fontSize: 16,
    color: 'white',
  },
  selectedCategoryText: {
    color: AppColor.BLUE_300,
  },
  otherTextInput: {
    marginTop: 10,
    backgroundColor: AppColor.TRANSPARENT_BLUE_100,
    borderRadius: 8,
    padding: 8,
    borderWidth: 2,
    marginBottom: 10,
    borderColor: 'white',
  },
});

export { styles };
