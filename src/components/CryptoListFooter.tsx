import { ActivityIndicator, StyleSheet, View } from 'react-native';

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
  if (!(loading && hasMore && !searchTerm)) return null;

  return (
    <View style={styles.footer}>
      <ActivityIndicator size="small" color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    height: 60,
    justifyContent: 'center',
    paddingVertical: 20,
  },
});

export default CryptoListFooter;
