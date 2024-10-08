import type { Order } from '~/types/Order'
import type { OrderItem } from '~/types/OrderItem'
import type { Tab, TabTableRow } from '~/types/Tab'
import { formatCurrency } from '../currency'

/**
 * Extracts a list of all order items given a list of orders
 *
 * @param orders list of orders
 * @returns list of all order items
 */
export const combineOrderItems = (orders: Order[]): OrderItem[] => {
  const itemMap: Record<string, OrderItem> = {}

  orders.forEach((order) => {
    order.items.forEach((item) => {
      if (itemMap[item.id]) {
        // Update quantity and total if item exists
        itemMap[item.id].quantity += item.quantity
        itemMap[item.id].total += item.total
      } else {
        // Add to the map if it doesn't exist yet
        itemMap[item.id] = { ...item }
      }
    })
  })

  return Object.values(itemMap)
}

/**
 * Calculates the tab total given a list of orders
 *
 * @param orders list of orders to calculate total from
 * @returns tab total for provided list of orders
 */
export const getTabTotalFromOrders = (orders: Order[]): number => {
  return orders.reduce((acc, order) => acc + order.total, 0)
}

/**
 * Formats the provided list of tabs, to be used in a table
 *
 * @param tabs list of tabs
 * @returns formatted list of tab overview details
 */
export const getTabTableDataFromTabs = (tabs: Tab[]): TabTableRow[] => {
  return tabs.map((tab) => ({
    id: tab.id,
    customer: tab.customer.name,
    table: tab.customer.tableNumber?.toString() ?? 'NA',
    orders: tab.orders.length,
    total: formatCurrency({ amount: getTabTotalFromOrders(tab.orders) }),
  }))
}

/**
 * Extracts a list of order items from the given menu
 *
 * @param menu the menu
 * @returns list of order items
 */
export const getOrderItemsFromMenu = (
  menu: {
    id: string
    name: string
    price: number
    quantity: number
  }[],
): OrderItem[] => {
  return menu.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    total: item.price * item.quantity,
  }))
}

/**
 * Calculates the total for a given list of order items
 *
 * @param items list of order items
 * @returns total value
 */
export const getOrderItemsTotal = (items: OrderItem[]): number =>
  items.reduce((acc, item) => acc + item.total, 0)
