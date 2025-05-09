import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface EmptyListMessageProps {
  searchTerm: string;
  onClear: () => void;
}

const EmptyListMessage: React.FC<EmptyListMessageProps> = ({
  searchTerm,
  onClear,
}) => {
  if (!searchTerm) return null;

  return (
    <View style={styles.noResults}>
      <Text style={styles.messageText}>
        No se encontraron criptos con "{searchTerm}"
      </Text>
      <TouchableOpacity style={styles.clearButton} onPress={onClear}>
        <Text style={styles.clearButtonText}>Limpiar búsqueda</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  noResults: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 10,
  },
  messageText: {
    color: '#6B7280',
    marginBottom: 10,
  },
  clearButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#2F80ED',
    fontWeight: '600',
  },
});

export default EmptyListMessage;
