import { StyleSheet } from 'react-native';

// import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 32,
    backgroundColor: '#BEE3F8',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
  },
});

export { styles };
