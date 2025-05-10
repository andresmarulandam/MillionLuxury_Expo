import { StyleSheet } from 'react-native';
import { AppTheme } from '../../theme/types';
import { spacing, typography } from '../../theme';

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
    },
    mainContainer: {
      flex: 1,
      backgroundColor: theme.background,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.lg,
    },
    listContent: {
      paddingBottom: spacing.xl * 2,
      rowGap: spacing.md,
    },
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
    },
    errorText: {
      color: theme.error,
      fontSize: typography.fontSize.lg,
      fontWeight: typography.fontWeight.regular,
      textAlign: 'center',
    },
  });

export default createStyles;
