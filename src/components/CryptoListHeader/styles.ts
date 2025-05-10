import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
  },
  header: {
    fontSize: theme.typography.fontSize.xxl,
    fontWeight: theme.typography.fontWeight.bold,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
    letterSpacing: 0.5,
  },
  themeToggle: {
    padding: theme.spacing.xs,
    position: 'absolute',
    right: theme.spacing.md,
    top: theme.spacing.xl,
  },
  searchContainer: {
    borderRadius: theme.metrics.borderRadius.full,
    paddingHorizontal: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',

    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    height: 52,
  },
  searchIcon: {
    marginRight: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: theme.typography.fontSize.base,
    paddingVertical: 0,
  },
});
