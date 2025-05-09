import { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { formatPercentage, formatPrice } from '../utils/formatters';
import { CryptoCurrency } from '../models/CryptoCurrency';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ListaStackParamList, RootTabParamList } from '../navigation/types';

interface CryptoItemProps {
  item: CryptoCurrency;
}

type DetailsNavigationProp = NavigationProp<
  ListaStackParamList,
  'CryptoDetails'
>;

const CryptoItem: React.FC<CryptoItemProps> = memo(
  ({ item }) => {
    const navigation = useNavigation<DetailsNavigationProp>();
    const percentage = formatPercentage(item.percent_change_24h);
    const formattedPrice = formatPrice(item.price_usd);
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('CryptoDetails', { id: item.id })}
      >
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
            style={percentage.isPositive ? styles.positive : styles.negative}
          >
            {percentage.formatted}
          </Text>
        </View>
      </TouchableOpacity>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.item.id === nextProps.item.id &&
      prevProps.item.price_usd === nextProps.item.price_usd &&
      prevProps.item.percent_change_24h === nextProps.item.percent_change_24h
    );
  },
);

export default CryptoItem;

const styles = StyleSheet.create({
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
    overflow: 'hidden',
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
    color: '#10B981',
  },
  negative: {
    color: '#EF4444',
  },
});
