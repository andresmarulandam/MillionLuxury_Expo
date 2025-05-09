export const formatPrice = (price: string | number): string => {
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericPrice);
};

export const formatPercentage = (
  change: string,
): {
  formatted: string;
  isPositive: boolean;
} => {
  const numericChange = parseFloat(change);
  const arrow = numericChange >= 0 ? '▲' : '▼';
  return {
    formatted: `${arrow} ${Math.abs(numericChange).toFixed(2)}%`,
    isPositive: numericChange >= 0,
  };
};
