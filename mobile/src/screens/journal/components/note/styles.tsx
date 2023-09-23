import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
  },
  textContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: AppColor.GRAY_600,
  },
  noteText: {
    fontSize: 16,
    lineHeight: 24,
    color: AppColor.GRAY_500,
  },
});

export { styles };
