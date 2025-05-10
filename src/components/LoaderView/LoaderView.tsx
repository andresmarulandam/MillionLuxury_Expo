import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { styles } from './styles';
import { useTheme } from '../../theme/useTheme';

const LoaderView = () => {
  const { theme } = useTheme();
  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color={theme.primary} />
    </View>
  );
};

export default LoaderView;
