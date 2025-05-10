import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ListaStackNavigator from '../ListaStackNavigator';
import { useTheme } from '../../theme/useTheme';
import styles from './styles';

export type RootTabParamList = {
  Lista: undefined;
  // otros tabs en los siguientes commits
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function TabNavigator() {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.tabBarActive,
        tabBarInactiveTintColor: theme.tabBarInactive,
        headerShown: false,
        tabBarStyle: {
          ...styles.tabBar,
          backgroundColor: theme.tabBarBackground,
          bottom: insets.bottom + 6,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tab.Screen
        name="Lista"
        component={ListaStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="list" color={color} size={32} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
