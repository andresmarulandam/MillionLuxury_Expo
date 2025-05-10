import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import createStyles from './styles';

interface DetailRowProps {
  label: string;
  value: string | number;
  isPercentage?: boolean;
  isPositive?: boolean;
  withDivider?: boolean;
}

const DetailRow: React.FC<DetailRowProps> = ({
  label,
  value,
  isPercentage = false,
  isPositive = true,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

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
        {isPercentage && '%'}
      </Text>
    </View>
  );
};

export default DetailRow;
