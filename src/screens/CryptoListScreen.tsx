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
  View,
} from 'react-native';
import CryptoItem from '../components/CryptoItem';
import EmptyListMessage from '../components/EmptyListMessage';
import CryptoListHeader from '../components/CryptoListHeader';
import CryptoListFooter from '../components/CryptoListFooter';

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
      <CryptoListHeader
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
      />

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
              <CryptoListFooter
                loading={loading}
                hasMore={hasMore}
                searchTerm={searchTerm}
              />
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
});
