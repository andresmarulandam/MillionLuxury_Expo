import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CryptoCurrency } from '../models/CryptoCurrency';
import { ApiService } from '../services/ApiService';
import {
  ActivityIndicator,
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CryptoItem from '../components/CryptoItem';
import EmptyListMessage from '../components/EmptyListMessage';

export default function CryptoListScreen() {
  const [cryptos, setCryptos] = useState<CryptoCurrency[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const loadMoreCryptos = useCallback(async () => {
    if (!hasMore || loading) return;

    try {
      setLoading(true);
      const nextPage = page + 1;
      const response = await ApiService.getCryptos(nextPage * 100, 100);

      setCryptos((prev) => {
        const newData = response.data.filter(
          (newItem) => !prev.some((item) => item.id === newItem.id),
        );
        return [...prev, ...newData];
      });

      setPage(nextPage);
      setHasMore(response.data.length >= 100);
    } finally {
      setLoading(false);
    }
  }, [page, hasMore, loading]);

  const filteredCryptos = useMemo(() => {
    if (!searchTerm) return cryptos;

    const term = searchTerm.toLowerCase();
    const result = cryptos.filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(term) ||
        crypto.symbol.toLowerCase().includes(term),
    );

    return result;
  }, [cryptos, searchTerm]);

  useEffect(() => {
    const loadCryptos = async () => {
      try {
        setLoading(true);
        const response = await ApiService.getCryptos(0, 100);
        setCryptos(response.data);
        setHasMore(response.data.length > 0);
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
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Top Cryptocurrencies</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar criptomonedas..."
            placeholderTextColor="#999"
            value={searchTerm}
            onChangeText={setSearchTerm}
            clearButtonMode="while-editing"
          />
        </View>
      </View>

      <View style={styles.mainContainer}>
        {loading && cryptos.length === 0 ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#0052FF" />
          </View>
        ) : error ? (
          <View style={styles.center}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : (
          <FlatList
            data={searchTerm ? filteredCryptos : cryptos}
            keyExtractor={(item) => `${item.id}-${item.nameid}`}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => <CryptoItem item={item} />}
            onEndReached={() => {
              loadMoreCryptos();
            }}
            onEndReachedThreshold={0.1}
            initialNumToRender={10}
            maxToRenderPerBatch={5}
            windowSize={10}
            updateCellsBatchingPeriod={50}
            ListEmptyComponent={
              <EmptyListMessage
                searchTerm={searchTerm}
                onClear={() => setSearchTerm('')}
              />
            }
            ListFooterComponent={
              loading && hasMore && !searchTerm ? (
                <View
                  style={{
                    height: 60,
                    justifyContent: 'center',
                    paddingVertical: 20,
                  }}
                >
                  <ActivityIndicator size="small" color="red" />
                </View>
              ) : null
            }
          />
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
    paddingBottom: 50,
    paddingTop: 8,
  },

  errorText: {
    color: '#EF4444',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 24,
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
