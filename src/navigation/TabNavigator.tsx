import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CryptoListScreen from '../screens/CryptoListScreen';
import CryptoDetailsScreen from '../screens/CryptoDetailsScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import ListaStackNavigator from './ListaStackNavigator';

export type RootTabParamList = {
  Lista: undefined;
  // otros tabs en los siguientes commits
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function TabNavigator() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#2F80ED',
        tabBarInactiveTintColor: '#6B7280',
        headerShown: false,
        tabBarStyle: {
          ...styles.tabBar,
          bottom: insets.bottom + 6,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Lista"
        component={ListaStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    left: 16,
    right: 16,
    marginHorizontal: 20,
    backgroundColor: '#050134',
    borderRadius: 16,
    height: 50,
    paddingBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 10,
  },
});
