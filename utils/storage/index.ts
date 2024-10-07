import type { Order } from '~/types/Order'
import type { Tab } from '~/types/Tab'

const STORAGE_KEY = 'boozeway'

/**
 * Fetches all tabs in localStorage
 *
 * @returns list of tabs
 */
export const fetchAllTabs = (): Tab[] => {
  const rawData = localStorage.getItem(STORAGE_KEY)

  if (rawData) {
    const data = JSON.parse(rawData)
    return data.tabs || []
  }

  return []
}

/**
 * Persits a list of tabs to localStorage
 *
 * @param tabs list of tabs to persist
 */
export const setAllTabs = (tabs: Tab[]) => {
  const data = { tabs }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

/**
 * Fetches a specific tab given it's id
 *
 * @param tabId id of tab to fetch
 * @returns requested tab for the provided id
 */
export const fetchTab = (tabId: string): Tab | undefined => {
  const tabs = fetchAllTabs()

  const tab = tabs.filter(({ id }) => id === tabId)[0]
  return tab
}

/**
 * Deletes a specific tab given it's id
 *
 * @param tabId id of tab to delete
 */
export const deleteTab = (tabId: string) => {
  const tabs = fetchAllTabs()

  const remainingTabs = tabs.filter(({ id }) => id !== tabId)
  setAllTabs(remainingTabs)
}

/**
 * Persits a new tab in localStorage
 *
 * @param tab tab data to persist
 */
export const createTab = (tab: Tab) => {
  const tabs = fetchAllTabs()
  setAllTabs([...tabs, tab])
}

/**
 * Adds and persists new order data to a specified tab
 *
 * @param tabId id of tab to append order to
 * @param order order data to persist
 */
export const createOrder = (tabId: string, order: Order) => {
  const tab = fetchTab(tabId)

  if (tab) {
    const orders = tab.orders || []
    tab.orders = [
      ...orders,
      { ...order, createdAt: order.createdAt.toString() },
    ]

    deleteTab(tab.id)
    createTab(tab)
  }
}
