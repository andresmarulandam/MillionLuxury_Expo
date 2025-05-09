import { useEffect, useState } from 'react';
import { CryptoCurrency } from '../models/CryptoCurrency';
import { ApiService } from '../services/ApiService';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { formatPercentage, formatPrice } from '../utils/formatters';

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
        let errorMessage = 'Failed to load cryptocurrencies';
        if (err instanceof Error) {
          errorMessage = err.message;
        } else if (typeof err === 'string') {
          errorMessage = err;
        }
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    loadCryptos();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContainer}>
        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#0052FF" />
          </View>
        ) : error ? (
          <View style={styles.center}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : (
          <>
            <Text style={styles.header}>Top Cryptocurrencies</Text>
            <FlatList
              data={cryptos}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContent}
              renderItem={({ item }) => {
                const percentage = formatPercentage(item.percent_change_24h);
                const formattedPrice = formatPrice(item.price_usd);
                return (
                  <View style={styles.card}>
                    <View style={styles.row}>
                      <View>
                        <Text style={styles.symbol}>{item.symbol}</Text>
                        <Text style={styles.name} numberOfLines={1}>
                          {item.name}
                        </Text>
                      </View>
                      <View style={styles.changeContainer}>
                        <Text style={styles.price}>${formattedPrice}</Text>
                      </View>
                    </View>

                    <View style={styles.row}>
                      <Text>Market Cap:</Text>
                      <Text
                        style={
                          percentage.isPositive
                            ? styles.positive
                            : styles.negative
                        }
                      >
                        {percentage.formatted}
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'blue',
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: 'orange',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

  listContent: {
    paddingBottom: 24,
    paddingTop: 8,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  symbol: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2F80ED',
  },
  name: {
    fontSize: 14,
    color: '#6B7280',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    fontFamily: 'System',
    letterSpacing: 0.5,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  change: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  positive: {
    color: '#10B981', // Verde
  },
  negative: {
    color: '#EF4444', // Rojo
  },

  // Loading y Error
  loadingText: {
    marginTop: 12,
    color: '#6B7280',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  retryButton: {
    marginTop: 16,
    backgroundColor: '#2F80ED',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  retryText: {
    color: '#FFF',
    fontWeight: '600',
  },
});
