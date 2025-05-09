import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const LoaderView = () => (
  <View style={styles.center}>
    <ActivityIndicator size="large" color="#0052FF" />
  </View>
);

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoaderView;
