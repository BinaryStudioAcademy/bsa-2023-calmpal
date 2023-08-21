import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ACB4D0',
    height: 44,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: 'white',
    marginBottom: 2,
    marginTop: 6,
  },

  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#EBF3FF',
    marginTop: 4,
  },

  placeholder: {
    color: '#ACB4D0',
  },
  filledInput: {
    borderWidth: 1,
    borderColor: '#507CEB',
    borderRadius: 8,
    fontSize: 16,
    padding: 12,
    backgroundColor: 'white',
    elevation: 10,
    shadowColor: '#507CEB',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },

  disabledInput: {
    borderColor: '#CCDDF3',
  },

  errorInput: {
    borderColor: '#D51A52',
  },

  errorText: {
    color: '#D51A52',
    fontSize: 14,
    marginBottom: 4,
  },
});

export { styles };
