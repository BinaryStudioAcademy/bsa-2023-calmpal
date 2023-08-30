import { StyleSheet } from 'react-native';

// import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: 40,
    height: 20,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: '#4287f5',
    cursor: 'pointer',
    transitionProperty: 'borderColor',
    transitionDuration: '0.2s',
  },
  label: {
    marginRight: 8,
  },

  dot: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4287f5',
    transitionProperty: 'left, transform, backgroundColor',
    transitionDuration: '0.2s',
    left: 2,
    transform: [{ translateX: 0 }],
    content: '',
  },
  dotChecked: {
    backgroundColor: '#52a8ff',
    left: '100%',
    transform: [{ translateX: -100 }],
  },
});

export { styles };
