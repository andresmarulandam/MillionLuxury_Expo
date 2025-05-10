import { StyleSheet } from 'react-native';
import { AppTheme } from '../../theme/types';
import { spacing } from '../../theme';

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
    },
    container: {
      flex: 1,
      paddingHorizontal: spacing.md,
      backgroundColor: theme.background,
    },
    listContent: {
      paddingBottom: spacing.xl,
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing.xl,
    },
    errorText: {
      color: theme.error,
      fontSize: 16,
      fontFamily: 'Inter-Medium',
    },
  });

export default createStyles;
