import type { Order } from '~/types/Order'
import type { OrderItem } from '~/types/OrderItem'

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
