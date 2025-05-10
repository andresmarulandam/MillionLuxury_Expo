import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { CryptoCurrency } from '../../models/CryptoCurrency';
import { ApiService } from '../../services/ApiService';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import CryptoItem from '../../components/CryptoItem/CryptoItem';
import EmptyListMessage from '../../components/EmptyListMessage/EmptyListMessage';
import CryptoListHeader from '../../components/CryptoListHeader/CryptoListHeader';
import CryptoListFooter from '../../components/CryptoListFooter/CryptoListFooter';
import LoaderView from '../../components/LoaderView/LoaderView';
import createstyles from './styles';
import { useTheme } from '../../theme/useTheme';

export default function CryptoListScreen() {
  const { theme, mode, setMode } = useTheme();
  const styles = useMemo(() => createstyles(theme), [theme]);

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

      <View style={styles.container}>
        {loading && cryptos.length === 0 ? (
          <LoaderView />
        ) : error ? (
          <View style={styles.errorContainer}>
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
