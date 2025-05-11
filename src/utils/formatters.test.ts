import { describe, expect, it } from 'vitest';
import { formatPercentage, formatPrice } from './formatters';

describe('formatters', () => {
  describe("'formatPrice'", () => {
    it('format integer numbers succesfully', () => {
      expect(formatPrice(1000)).toBe('1,000.00');
      expect(formatPrice(5000000)).toBe('5,000,000.00');
    });

    it('formatea number strings', () => {
      expect(formatPrice('1500.5')).toBe('1,500.50');
    });
  });

  describe('formatPercentage', () => {
    it('manage positive values', () => {
      const result = formatPercentage('5.25');
      expect(result.formatted).toBe('▲ 5.25%');
      expect(result.isPositive).toBe(true);
    });
    it('manage negative values', () => {
      const result = formatPercentage('-3.75');
      expect(result.formatted).toBe('▼ 3.75%');
      expect(result.isPositive).toBe(false);
    });
  });
});
