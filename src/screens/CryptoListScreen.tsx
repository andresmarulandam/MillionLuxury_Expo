import { useCallback, useEffect, useState } from 'react';
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
import CryptoItem from '../components/CryptoItem';

export default function CryptoListScreen() {
  const [cryptos, setCryptos] = useState<CryptoCurrency[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState(true);

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
              ListFooterComponent={
                <View
                  style={{
                    height: 60,
                    justifyContent: 'center',
                    paddingVertical: 20,
                  }}
                >
                  <ActivityIndicator size="small" color="red" />
                </View>
              }
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
    paddingBottom: 50,
    paddingTop: 8,
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
