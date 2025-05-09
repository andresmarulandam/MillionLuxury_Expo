import { RouteProp, useRoute } from '@react-navigation/native';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ListaStackParamList, RootTabParamList } from '../navigation/types';
import { useEffect, useState } from 'react';
import { CryptoCurrency } from '../models/CryptoCurrency';
import { ApiService } from '../services/ApiService';
import { SafeAreaView } from 'react-native-safe-area-context';

import CryptoDetailsContent from '../components/CryptoDetailsContent';
import LoaderView from '../components/LoaderView';

type DetailsScreenRouteProp = RouteProp<ListaStackParamList, 'CryptoDetails'>;

export default function CryptoDetailsScreen() {
  const route = useRoute<DetailsScreenRouteProp>();
  const { id } = route.params;

  const [crypto, setCrypto] = useState<CryptoCurrency | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCrypto = async () => {
      try {
        const data = await ApiService.getCryptoDetails(id);
        setCrypto(data);
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
    loadCrypto();
  }, [id]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContainer}>
        {loading ? (
          <LoaderView />
        ) : error || !crypto ? (
          <View style={styles.center}>
            <Text style={styles.errorText}>
              {error || 'Criptomoneda no encontrada'}
            </Text>
          </View>
        ) : (
          <CryptoDetailsContent crypto={crypto} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9FAFB',
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

  errorText: {
    color: '#EF4444',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
});
