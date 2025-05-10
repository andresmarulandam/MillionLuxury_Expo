import { memo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { formatPercentage, formatPrice } from '../../utils/formatters';
import { CryptoCurrency } from '../../models/CryptoCurrency';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ListaStackParamList } from '../../navigation/types';
import { useTheme } from '../../theme/useTheme';
import createStyles from './styles';

interface CryptoItemProps {
  item: CryptoCurrency;
}

type DetailsNavigationProp = NavigationProp<
  ListaStackParamList,
  'CryptoDetails'
>;

const CryptoItem: React.FC<CryptoItemProps> = memo(
  ({ item }) => {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const navigation = useNavigation<DetailsNavigationProp>();

    const percentage = formatPercentage(item.percent_change_24h);
    const formattedPrice = formatPrice(item.price_usd);

    return (
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('CryptoDetails', { id: item.id })}
      >
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.symbol}>{item.symbol}</Text>
        </View>

        <View style={styles.priceInfo}>
          <Text style={styles.price}>${formattedPrice}</Text>
          <Text
            style={[
              styles.percent,
              percentage.isPositive ? styles.positive : styles.negative,
            ]}
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
