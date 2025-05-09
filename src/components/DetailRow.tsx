import { StyleSheet, Text, View } from 'react-native';
import { formatPercentage, formatPrice } from '../utils/formatters';

const DetailRow = ({
  label,
  value,
  isPercentage = false,
  isPositive = true,
}: {
  label: string;
  value: string | number;
  isPercentage?: boolean;
  isPositive?: boolean;
}) => {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text
        style={[
          styles.value,
          isPercentage && (isPositive ? styles.positive : styles.negative),
        ]}
      >
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    color: '#6B7280',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  positive: {
    color: '#10B981',
  },
  negative: {
    color: '#EF4444',
  },
});
export default DetailRow;
