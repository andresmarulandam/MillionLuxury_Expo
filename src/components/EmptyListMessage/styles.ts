import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  noResults: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 10,
  },
  messageText: {
    marginBottom: 10,
    fontSize: 16,
  },
  clearButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 15,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
    alignItems: 'center',
  },
  clearButtonText: {
    fontWeight: '600',
  },
});
