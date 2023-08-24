import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#507CEB',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 55,
  },
  backgroundWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: -1,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  topBubbleImage: {
    position: 'absolute',
    top: 30,
    right: 0,
  },
  bottomBubbleImage: {
    position: 'absolute',
    bottom: 60,
    left: 0,
  },
});

export { styles };
