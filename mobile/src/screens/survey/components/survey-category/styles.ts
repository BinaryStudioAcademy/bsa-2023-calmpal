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
    borderRadius: 22,
    borderWidth: 1,
    marginBottom: 10,
    borderColor: AppColor.WHITE,
    height: 44,
    justifyContent: 'center',
  },
  selectedCategoryButton: {
    backgroundColor: AppColor.BLUE_100_ALPHA_70,
  },
  categoryText: {
    fontSize: 16,
    color: AppColor.WHITE,
  },
  selectedCategoryText: {
    color: AppColor.BLUE_400,
  },
});

export { styles };
