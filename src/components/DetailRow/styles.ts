import { StyleSheet } from 'react-native';
import { AppTheme } from '../../theme/types';
import { spacing, typography } from '../../theme';

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.sm,
      paddingVertical: spacing.xs,
    },
    label: {
      fontSize: typography.fontSize.base,
      color: theme.textSecondary,
      flex: 1,
    },
    value: {
      fontSize: typography.fontSize.base,
      fontWeight: typography.fontWeight.semiBold,
      color: theme.text,
      marginLeft: spacing.md,
    },
    positive: {
      color: theme.success,
    },
    negative: {
      color: theme.error,
    },
  });

export default createStyles;
