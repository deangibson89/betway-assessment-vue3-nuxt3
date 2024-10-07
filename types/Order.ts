import type { OrderItem } from '@/types/OrderItem'

export interface Order {
  id: string
  items: OrderItem[]
  total: number
  createdAt: Date | string
}
