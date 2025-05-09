import { StyleSheet, Text, TextInput, View } from 'react-native';

interface CryptoListHeaderProps {
  searchTerm: string;
  onSearchTermChange: (text: string) => void;
}

const CryptoListHeader: React.FC<CryptoListHeaderProps> = ({
  searchTerm,
  onSearchTermChange,
}) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.header}>Top Cryptocurrencies</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar criptomonedas..."
          placeholderTextColor="#999"
          value={searchTerm}
          onChangeText={onSearchTermChange}
          clearButtonMode="while-editing"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: 'orange',
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  header: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A1A1A',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  searchContainer: {
    padding: 10,
    borderRadius: 5,
  },
  searchInput: {
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
});

export default CryptoListHeader;
