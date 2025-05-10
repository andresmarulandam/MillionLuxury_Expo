import { StyleSheet } from 'react-native';
import { AppTheme } from '../../theme/types';
import { spacing, typography } from '../../theme';

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    detailsContent: {
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.xs,
    },
    title: {
      fontSize: typography.fontSize.xxl,
      fontWeight: typography.fontWeight.bold,
      color: theme.text,
      textAlign: 'center',
      marginBottom: spacing.xl,
      letterSpacing: 0.5,
    },
    card: {
      backgroundColor: theme.card,
      borderRadius: spacing.md,
      padding: spacing.lg,
      marginBottom: spacing.lg,
      shadowColor: theme.shadowColor,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
      borderWidth: 1,
      borderColor: theme.border,
    },
    sectionTitle: {
      fontSize: typography.fontSize.lg,
      fontWeight: typography.fontWeight.semiBold,
      color: theme.text,
      marginBottom: spacing.md,
      textAlign: 'center',
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
  });

export default createStyles;
