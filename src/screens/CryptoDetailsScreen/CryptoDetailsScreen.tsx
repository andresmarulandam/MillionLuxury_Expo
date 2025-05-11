import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';
import { ListaStackParamList } from '../../navigation/types';
import { useEffect, useState } from 'react';
import { CryptoCurrency } from '../../models/CryptoCurrency';
import { ApiService } from '../../services/ApiService';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import CryptoDetailsContent from '../../components/CryptoDetailsContent/CryptoDetailsContent';
import LoaderView from '../../components/LoaderView/LoaderView';
import { useTheme } from '../../theme/useTheme';
import createStyles from './styles';

type DetailsScreenRouteProp = RouteProp<ListaStackParamList, 'CryptoDetails'>;

export default function CryptoDetailsScreen() {
  const route = useRoute<DetailsScreenRouteProp>();
  const navigation = useNavigation();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { id } = route.params;

  const [crypto, setCrypto] = useState<CryptoCurrency | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCrypto = async () => {
      try {
        const data = await ApiService.getCryptoDetails(id);
        setCrypto(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load crypto details',
        );
      } finally {
        setLoading(false);
      }
    };
    loadCrypto();
  }, [id]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContainer}>
        {loading ? (
          <LoaderView />
        ) : error || !crypto ? (
          <View style={styles.center}>
            <Text style={styles.errorText}>
              {error || 'Criptomoneda no encontrada'}
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={navigation.goBack}
                hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
              >
                <Ionicons name="chevron-back" size={24} color={theme.primary} />
              </TouchableOpacity>
              <Text style={[styles.title, { color: theme.text }]}>
                {crypto.name} ({crypto.symbol})
              </Text>
            </View>
            <CryptoDetailsContent crypto={crypto} />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
