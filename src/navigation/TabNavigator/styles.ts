import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    marginHorizontal: 24,
    borderRadius: 16,
    height: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default styles;
