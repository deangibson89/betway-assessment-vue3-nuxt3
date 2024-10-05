import type { Customer } from '@/types/Customer'
import type { Order } from '@/types/Order'
import type { OrderItem } from '@/types/OrderItem'

export interface Tab {
  id: string
  customer: Customer
  orderItems: OrderItem[]
  orderHistory: Order[]
  total: number
  splitBy?: number
}
