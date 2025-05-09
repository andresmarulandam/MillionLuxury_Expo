import { useEffect, useState } from 'react';
import { CryptoCurrency } from '../models/CryptoCurrency';
import { ApiService } from '../services/ApiService';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function CryptoListScreen() {
  const [cryptos, setCryptos] = useState<CryptoCurrency[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCryptos = async () => {
      try {
        setLoading(true);
        const response = await ApiService.getCryptos();
        setCryptos(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load cryptocurrencies. Please try again later.');
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };
    loadCryptos();
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View>
      <Text></Text>
      <FlatList
        data={cryptos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.symbol}>{item.symbol}</Text>
            <Text>{item.name}</Text>
            <Text>${item.price_usd}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  item: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  symbol: { fontWeight: 'bold' },
  errorText: { color: 'red', textAlign: 'center' },
});
