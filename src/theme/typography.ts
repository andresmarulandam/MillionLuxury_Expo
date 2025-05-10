export const typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },
  fontWeight: {
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
    extraBold: '800',
  },
  lineHeight: {
    xs: 16,
    sm: 20,
    base: 22,
    lg: 24,
    xl: 28,
    xxl: 36,
    xxxl: 44,
  },
  textStyles: {
    header: {
      fontSize: 32,
      fontWeight: '700',
      lineHeight: 40,
    },
    title: {
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 32,
    },
    subtitle: {
      fontSize: 20,
      fontWeight: '500',
      lineHeight: 24,
    },
    body: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 22,
    },
    caption: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 18,
    },
    priceLarge: {
      fontSize: 28,
      fontWeight: '700',
      lineHeight: 36,
    },
    priceChange: {
      fontSize: 14,
      fontWeight: '600',
      lineHeight: 18,
    },
  },
} as const;
