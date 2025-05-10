import { StyleSheet } from 'react-native';
import { AppTheme } from '../../theme/types';
import { spacing, typography } from '../../theme';

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.card,
      borderRadius: spacing.md,
      padding: spacing.md,
      marginVertical: spacing.sm,
      shadowColor: theme.shadowColor,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },

    info: {
      flex: 1,
    },
    name: {
      fontSize: typography.fontSize.base,
      fontWeight: typography.fontWeight.bold,
      color: theme.text,
    },
    symbol: {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.regular,
      color: theme.textSecondary,
      marginTop: spacing.xs,
    },
    priceInfo: {
      alignItems: 'flex-end',
    },
    price: {
      fontSize: typography.fontSize.base,
      fontWeight: typography.fontWeight.bold,
      color: theme.text,
    },
    percent: {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
      marginTop: spacing.xs,
    },
    positive: {
      color: theme.success,
    },
    negative: {
      color: theme.error,
    },
  });

export default createStyles;
