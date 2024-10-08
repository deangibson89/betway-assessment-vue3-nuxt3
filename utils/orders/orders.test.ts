import { describe, expect, it } from 'vitest'
import type { Order } from '~/types/Order'
import type { Tab } from '~/types/Tab'
import {
  combineOrderItems,
  getTabTableDataFromTabs,
  getTabTotalFromOrders,
} from '.'

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

  describe('getTabTotalFromOrders', () => {
    it('should return 0 for an empty orders array', () => {
      const orders: Order[] = []
      expect(getTabTotalFromOrders(orders)).toBe(0)
    })

    it('should return the total of all orders', () => {
      const orders = [{ total: 100 }, { total: 200 }, { total: 300 }] as Order[]
      expect(getTabTotalFromOrders(orders)).toBe(600)
    })
  })

  describe('getTabTableDataFromTabs', () => {
    it('should return an empty array for an empty tabs array', () => {
      const tabs: Tab[] = []
      expect(getTabTableDataFromTabs(tabs)).toEqual([])
    })

    it('should return tab table data correctly', () => {
      const tabs: Tab[] = [
        {
          id: '1',
          customer: { name: 'John Doe', tableNumber: 5, id: '1' },
          orders: [{ total: 100 }, { total: 200 }] as Order[],
        },
        {
          id: '2',
          customer: { name: 'Jane Smith', tableNumber: undefined, id: '2' },
          orders: [{ total: 150 }] as Order[],
        },
      ]
      const expected = [
        {
          id: '1',
          customer: 'John Doe',
          table: '5',
          orders: 2,
          total: 'R 300.00',
        },
        {
          id: '2',
          customer: 'Jane Smith',
          table: 'NA',
          orders: 1,
          total: 'R 150.00',
        },
      ]
      expect(getTabTableDataFromTabs(tabs)).toEqual(expected)
    })
  })
})
