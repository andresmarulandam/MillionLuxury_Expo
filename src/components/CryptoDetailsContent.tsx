// components/CryptoDetailsContent.tsx
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { CryptoCurrency } from '../models/CryptoCurrency';
import { formatPercentage, formatPrice } from '../utils/formatters';
import DetailRow from './DetailRow';

interface Props {
  crypto: CryptoCurrency;
}

const CryptoDetailsContent: React.FC<Props> = ({ crypto }) => {
  return (
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
          value={`${formatPrice(crypto.price_btc)}`}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Variación</Text>
        <DetailRow
          label="Última hora"
          value={formatPercentage(crypto.percent_change_1h).formatted}
          isPercentage
          isPositive={formatPercentage(crypto.percent_change_1h).isPositive}
        />
        <DetailRow
          label="24 horas"
          value={formatPercentage(crypto.percent_change_24h).formatted}
          isPercentage
          isPositive={formatPercentage(crypto.percent_change_24h).isPositive}
        />
        <DetailRow
          label="7 días"
          value={formatPercentage(crypto.percent_change_7d).formatted}
          isPercentage
          isPositive={formatPercentage(crypto.percent_change_7d).isPositive}
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
        <DetailRow label="Máximo" value={crypto.msupply || 'Sin límite'} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
});

export default CryptoDetailsContent;
