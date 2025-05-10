import { Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/useTheme';
import { styles } from './styles';
import { baseColors } from '../../theme/colors';

interface CryptoListHeaderProps {
  searchTerm: string;
  onSearchTermChange: (text: string) => void;
}

const CryptoListHeader: React.FC<CryptoListHeaderProps> = ({
  searchTerm,
  onSearchTermChange,
}) => {
  const { theme } = useTheme();
  return (
    <View
      style={[
        styles.headerContainer,
        {
          backgroundColor: baseColors.gray900,
          borderBottomColor: baseColors.gray700,
        },
      ]}
    >
      <Text style={[styles.header, { color: baseColors.white }]}>
        Cryptocurrencies
      </Text>

      <View
        style={[
          styles.searchContainer,
          {
            backgroundColor: baseColors.gray800,
            shadowColor: baseColors.black,
          },
        ]}
      >
        <Ionicons
          name="search-outline"
          size={24}
          color={baseColors.gray400}
          style={styles.searchIcon}
        />
        <TextInput
          style={[
            styles.searchInput,
            {
              color: baseColors.white,
            },
          ]}
          placeholder="Search Bitcoin, Ethereum..."
          placeholderTextColor={baseColors.gray500}
          value={searchTerm}
          onChangeText={onSearchTermChange}
          clearButtonMode="while-editing"
          returnKeyType="search"
          selectionColor={baseColors.blue}
        />
      </View>
    </View>
  );
};

export default CryptoListHeader;
