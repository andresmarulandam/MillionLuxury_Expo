import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { styles } from './styles';
import { baseColors } from '../../theme/colors';

interface EmptyListMessageProps {
  searchTerm: string;
  onClear: () => void;
}

const EmptyListMessage: React.FC<EmptyListMessageProps> = ({
  searchTerm,
  onClear,
}) => {
  const { theme } = useTheme();
  if (!searchTerm) return null;

  return (
    <View style={styles.noResults}>
      <Text style={[styles.messageText, { color: theme.textSecondary }]}>
        No se encontraron criptos con "{searchTerm}"
      </Text>
      <TouchableOpacity
        style={[
          styles.clearButton,
          {
            backgroundColor: theme.background,
            borderColor: theme.border,
          },
        ]}
        onPress={onClear}
      >
        <Text style={[styles.clearButtonText, { color: theme.primary }]}>
          Limpiar búsqueda
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyListMessage;
