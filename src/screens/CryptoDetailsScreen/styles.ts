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
      paddingHorizontal: spacing.lg,
    },
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing.xl,
    },
    header: {
      marginBottom: spacing.xl,
      display: 'flex',
      flexDirection: 'row',
      gap: 30,
    },
    title: {
      fontSize: typography.fontSize.xxl,
      fontWeight: typography.fontWeight.bold,
      textAlign: 'center',
      marginTop: spacing.sm,
    },
    errorText: {
      color: theme.error,
      fontSize: typography.fontSize.lg,
      textAlign: 'center',
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.card,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 8,
      shadowColor: theme.shadowColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
      marginTop: spacing.md,
      alignSelf: 'flex-start',
    },
  });

export default createStyles;
