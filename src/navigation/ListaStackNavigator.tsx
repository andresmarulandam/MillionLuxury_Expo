import { createStackNavigator } from '@react-navigation/stack';
import CryptoListScreen from '../screens/CryptoListScreen/CryptoListScreen';
import CryptoDetailsScreen from '../screens/CryptoDetailsScreen';
import { ListaStackParamList } from './types';

const Stack = createStackNavigator<ListaStackParamList>();

export default function ListaStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CryptoList" component={CryptoListScreen} />
      <Stack.Screen name="CryptoDetails" component={CryptoDetailsScreen} />
    </Stack.Navigator>
  );
}
