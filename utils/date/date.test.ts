import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { getRelativeTimeFromDate, getTimeFromDate } from '.'

describe('Date Utils', () => {
  const mockDate = new Date('2024-01-01T12:00:00+02:00')

  beforeEach(() => {
    vi.setSystemTime(mockDate)
  })

  describe('getTimeFromDate', () => {
    it('should return the correct time format', () => {
      const date = new Date('2024-01-01T08:30:00+02:00')
      const formattedTime = getTimeFromDate(date)

      expect(formattedTime).toBe('8:30 AM')
    })
  })

  describe('getRelativeTimeFromDate', () => {
    it('should return the correct relative time', () => {
      const date = new Date('2024-01-01T10:00:00+02:00')

      const relativeTime = getRelativeTimeFromDate(date)

      expect(relativeTime).toBe('2 hours ago')
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })
})
