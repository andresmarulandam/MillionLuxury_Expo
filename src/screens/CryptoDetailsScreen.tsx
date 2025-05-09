import { RouteProp, useRoute } from '@react-navigation/native';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { RootTabParamList } from '../navigation/types';
import { useEffect, useState } from 'react';
import { CryptoCurrency } from '../models/CryptoCurrency';
import { ApiService } from '../services/ApiService';
import { SafeAreaView } from 'react-native-safe-area-context';
import DetailRow from '../components/DetailRow';
import { formatPercentage, formatPrice } from '../utils/formatters';

type DetailsScreenRouteProp = RouteProp<RootTabParamList, 'Detalles'>;

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
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#0052FF" />
          </View>
        ) : error || !crypto ? (
          <View style={styles.center}>
            <Text style={styles.errorText}>
              {error || 'Criptomoneda no encontrada'}
            </Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.detailsContent}>
            <Text style={styles.title}>
              {crypto.name} ({crypto.symbol})
            </Text>

            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Datos principales</Text>
              <DetailRow label="Ranking" value={`# ${crypto.rank}`} />
              <DetailRow
                label="Precio (USD)"
                value={`$ ${formatPrice(crypto.price_usd)}`}
              />
              <DetailRow
                label="Precio (BTC)"
                value={`$ ${formatPrice(crypto.price_btc)}`}
              />
            </View>

            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Variación</Text>
              <DetailRow
                label="Última hora"
                value={`${
                  formatPercentage(crypto.percent_change_1h).formatted
                }`}
                isPercentage
                isPositive={
                  formatPercentage(crypto.percent_change_1h).isPositive
                }
              />
              <DetailRow
                label="24 horas"
                value={`${
                  formatPercentage(crypto.percent_change_24h).formatted
                }`}
                isPercentage
                isPositive={
                  formatPercentage(crypto.percent_change_24h).isPositive
                }
              />
              <DetailRow
                label="7 días"
                value={`${
                  formatPercentage(crypto.percent_change_7d).formatted
                }`}
                isPercentage
                isPositive={
                  formatPercentage(crypto.percent_change_7d).isPositive
                }
              />
            </View>

            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Mercado</Text>
              <DetailRow
                label="Market Cap"
                value={`$ ${formatPrice(crypto.market_cap_usd)}`}
              />
              <DetailRow
                label="Volumen 24h"
                value={`$ ${formatPrice(crypto.volume24)}`}
              />
            </View>

            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Suministro</Text>
              <DetailRow label="Circulante" value={crypto.csupply} />
              <DetailRow label="Total" value={crypto.tsupply} />
              <DetailRow
                label="Máximo"
                value={crypto.msupply || 'Sin límite'}
              />
            </View>
          </ScrollView>
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
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#374151',
    alignSelf: 'center',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  detailsContent: {
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1F2937',
    textAlign: 'center',
  },
  detailCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
});
