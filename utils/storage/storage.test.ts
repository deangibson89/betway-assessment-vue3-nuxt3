import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Order } from '~/types/Order'
import type { Tab } from '~/types/Tab'
import {
  createOrder,
  createTab,
  deleteTab,
  fetchAllTabs,
  fetchTab,
  setAllTabs,
} from './index'

const STORAGE_KEY = 'boozeway'

const mockDate = new Date('2024-01-01T12:00:00+02:00')
const mockCustomer = {
  id: 'customer-1',
  name: 'John Wick',
  tableNumber: 12,
}

describe('Storage Functions', () => {
  beforeEach(() => {
    vi.setSystemTime(mockDate)
    localStorage.clear()
  })

  it('should fetch all tabs', () => {
    const tabs: Tab[] = [{ id: 'tab-1', customer: mockCustomer, orders: [] }]
    setAllTabs(tabs)

    const fetchedTabs = fetchAllTabs()
    expect(fetchedTabs).toEqual(tabs)
  })

  it('should set all tabs', () => {
    const tabs: Tab[] = [{ id: 'tab-1', customer: mockCustomer, orders: [] }]
    setAllTabs(tabs)

    const rawData = localStorage.getItem(STORAGE_KEY)
    expect(rawData).toBe(JSON.stringify({ tabs }))
  })

  it('should fetch a specific tab', () => {
    const tabs: Tab[] = [{ id: 'tab-1', customer: mockCustomer, orders: [] }]
    setAllTabs(tabs)

    const fetchedTab = fetchTab('tab-1')
    expect(fetchedTab).toEqual(tabs[0])
  })

  it('should return undefined for a non-existing tab', () => {
    const fetchedTab = fetchTab('xxx')
    expect(fetchedTab).toBeUndefined()
  })

  it('should delete a tab', () => {
    const tabs: Tab[] = [
      { id: 'tab-1', customer: mockCustomer, orders: [] },
      { id: 'tab-2', customer: mockCustomer, orders: [] },
    ]
    setAllTabs(tabs)

    deleteTab('tab-1')
    const fetchedTabs = fetchAllTabs()
    expect(fetchedTabs).toEqual([
      { id: 'tab-2', customer: mockCustomer, orders: [] },
    ])
  })

  it('should create a new tab', () => {
    const tab: Tab = { id: 'tab-1', customer: mockCustomer, orders: [] }
    createTab(tab)

    const fetchedTabs = fetchAllTabs()
    expect(fetchedTabs).toEqual([tab])
  })

  it('should create an order in a tab', () => {
    const tab: Tab = { id: 'tab-1', customer: mockCustomer, orders: [] }
    createTab(tab)

    const order: Order = {
      id: 'order-1',
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
    }
    createOrder('tab-1', order)

    const updatedTab = fetchTab('tab-1')

    expect(updatedTab?.orders).toStrictEqual([
      { ...order, createdAt: mockDate.toString() },
    ])
  })
})
