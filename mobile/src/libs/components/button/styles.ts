import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#302E36',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    borderRadius: 8,
    gap: 10,
  },
  label: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  btnDisabled: {
    backgroundColor: '#312F377F',
  },
  labelDisabled: {
    color: '#FFFFFF7F',
  },
  btnPressed: {
    backgroundColor: '#1D1C21FF',
  },
});

export { styles };
