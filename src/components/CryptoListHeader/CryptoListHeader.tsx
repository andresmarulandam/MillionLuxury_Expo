import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/useTheme';
import { styles } from './styles';

interface CryptoListHeaderProps {
  searchTerm: string;
  onSearchTermChange: (text: string) => void;
}

const CryptoListHeader: React.FC<CryptoListHeaderProps> = ({
  searchTerm,
  onSearchTermChange,
}) => {
  const { theme, toggleMode, isDark } = useTheme();
  return (
    <View
      style={[
        styles.headerContainer,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <View style={styles.headerContainer}>
        <Text style={[styles.header, { color: theme.text }]}>
          Cryptocurrencies
        </Text>
        <TouchableOpacity onPress={toggleMode} style={styles.themeToggle}>
          <Ionicons
            name={isDark ? 'sunny' : 'moon'}
            size={24}
            color={theme.accent}
          />
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.searchContainer,
          {
            backgroundColor: theme.card,
            shadowColor: theme.shadowColor,
          },
        ]}
      >
        <Ionicons
          name="search-outline"
          size={24}
          color={theme.textSecondary}
          style={styles.searchIcon}
        />
        <TextInput
          style={[
            styles.searchInput,
            {
              color: theme.text,
            },
          ]}
          placeholder="Search Bitcoin, Ethereum..."
          placeholderTextColor={theme.textSecondary}
          value={searchTerm}
          onChangeText={onSearchTermChange}
          clearButtonMode="while-editing"
          returnKeyType="search"
          selectionColor={theme.primary}
        />
      </View>
    </View>
  );
};

export default CryptoListHeader;
