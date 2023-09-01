import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 300,
    backgroundColor: AppColor.WHITE,
    borderRadius: 20,
  },

  default: {
    shadowColor: AppColor.PURPLE_100,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 6,
  },

  pressed: {
    shadowColor: AppColor.BLUE_300,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },

  iconContainer: {
    margin: 6,
    padding: 30,
    backgroundColor: AppColor.BLUE_300,
    borderRadius: 20,
  },
  titleContainer: {
    flex: 1,
    margin: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: AppColor.GRAY_500,
  },
});

export { styles };
