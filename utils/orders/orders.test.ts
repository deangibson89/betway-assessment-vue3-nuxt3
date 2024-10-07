import { describe, expect, it } from 'vitest'
import { combineOrderItems } from '.'

describe('Orders Utils', () => {
  describe('combineOrderItems', () => {
    it('should return the correct list of order items', () => {
      const orders = [
        {
          id: 'order-1',
          items: [
            {
              id: 'beer',
              name: 'Beer',
              price: 45,
              quantity: 4,
              total: 180,
            },
            {
              id: 'cider',
              name: 'Cider',
              price: 52,
              quantity: 2,
              total: 104,
            },
          ],
          total: 284,
          createdAt: new Date(),
        },
        {
          id: 'order-2',
          items: [
            {
              id: 'premix',
              name: 'Premix',
              price: 59,
              quantity: 1,
              total: 59,
            },
          ],
          total: 59,
          createdAt: new Date(),
        },
      ]

      expect(combineOrderItems(orders)).toStrictEqual([
        {
          id: 'beer',
          name: 'Beer',
          price: 45,
          quantity: 4,
          total: 180,
        },
        {
          id: 'cider',
          name: 'Cider',
          price: 52,
          quantity: 2,
          total: 104,
        },
        {
          id: 'premix',
          name: 'Premix',
          price: 59,
          quantity: 1,
          total: 59,
        },
      ])
    })
  })
})
