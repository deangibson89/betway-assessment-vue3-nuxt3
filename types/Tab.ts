import type { Customer } from '@/types/Customer'
import type { Order } from '@/types/Order'

export interface Tab {
  id: string
  customer: Customer
  orders: Order[]
}
