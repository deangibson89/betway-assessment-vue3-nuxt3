import { describe, expect, it } from 'vitest'
import { formatCurrency } from '.'

describe('Currency Utils', () => {
  describe('formatCurrency', () => {
    it('should format the amount with the default symbol', () => {
      const result = formatCurrency({ amount: 1234.56 })
      expect(result).toBe('R 1,234.56')
    })

    it('should format the amount with a specified symbol', () => {
      const result = formatCurrency({ amount: 1234.56, symbol: '$' })
      expect(result).toBe('$ 1,234.56')
    })

    it('should handle zero amount', () => {
      const result = formatCurrency({ amount: 0 })
      expect(result).toBe('R 0.00')
    })

    it('should handle negative amounts', () => {
      const result = formatCurrency({ amount: -1234.56 })
      expect(result).toBe('R -1,234.56')
    })
  })
})
