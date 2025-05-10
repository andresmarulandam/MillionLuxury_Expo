import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { styles } from './styles';

interface CryptoListFooterProps {
  loading: boolean;
  hasMore: boolean;
  searchTerm: string;
}

const CryptoListFooter: React.FC<CryptoListFooterProps> = ({
  loading,
  hasMore,
  searchTerm,
}) => {
  const { theme } = useTheme();
  if (!(loading && hasMore && !searchTerm)) return null;

  return (
    <View style={styles.footer}>
      <ActivityIndicator size="small" color={theme.primary} />
    </View>
  );
};

export default CryptoListFooter;
