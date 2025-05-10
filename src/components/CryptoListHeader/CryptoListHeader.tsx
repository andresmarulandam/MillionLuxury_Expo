import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/useTheme';
import { styles } from './styles';
import { lightTheme, darkTheme } from '../../theme';
import { theme } from '../../theme';

interface CryptoListHeaderProps {
  searchTerm: string;
  onSearchTermChange: (text: string) => void;
}

const CryptoListHeader: React.FC<CryptoListHeaderProps> = ({
  searchTerm,
  onSearchTermChange,
}) => {
  const { theme: themeColors, toggleMode, isDark } = useTheme();
  const spacing = theme.spacing;
  return (
    <View
      style={[
        styles.headerContainer,
        {
          backgroundColor: themeColors.background,
        },
      ]}
    >
      <View style={styles.headerContainer}>
        <Text style={[styles.header, { color: themeColors.text }]}>
          Cryptocurrencies
        </Text>
        <TouchableOpacity
          onPress={toggleMode}
          style={{
            padding: spacing.xs,
            position: 'absolute',
            right: spacing.xs,
            top: spacing.xs,
            borderRadius: 18,
            backgroundColor: isDark
              ? lightTheme.background
              : darkTheme.background,
          }}
        >
          <Ionicons
            name={isDark ? 'sunny' : 'moon'}
            size={24}
            color={themeColors.accent}
          />
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.searchContainer,
          {
            backgroundColor: themeColors.card,
            shadowColor: themeColors.shadowColor,
          },
        ]}
      >
        <Ionicons
          name="search-outline"
          size={24}
          color={themeColors.textSecondary}
          style={styles.searchIcon}
        />
        <TextInput
          style={[
            styles.searchInput,
            {
              color: themeColors.text,
            },
          ]}
          placeholder="Search Bitcoin, Ethereum..."
          placeholderTextColor={themeColors.textSecondary}
          value={searchTerm}
          onChangeText={onSearchTermChange}
          clearButtonMode="while-editing"
          returnKeyType="search"
          selectionColor={themeColors.primary}
        />
      </View>
    </View>
  );
};

export default CryptoListHeader;
